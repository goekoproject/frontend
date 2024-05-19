import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  DOWN_ARROW,
  ENTER,
  LEFT_ARROW,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
  hasModifierKey,
} from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ViewportRuler,
} from '@angular/cdk/overlay';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  Self,
  ViewChild,
  forwardRef,
  isDevMode,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import {
  Observable,
  Subject,
  defer,
  distinctUntilChanged,
  merge,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  OptionSelectionChange,
  OptionSelectionEvent,
} from '../super-option/base-option.component';
import { SuperOptionComponent } from './../super-option/super-option.component';

let nextUniqueId = 0;

enum STATUS {
  success = 'select--success',
  error = 'select--error',
  default = 'select--default',
}
enum SIZE {
  large = 'select--large',
  medium = 'select--medium',
  small = 'select--small',
  xsmall = 'select--xsmall',
}
@Directive()
export abstract class BaseSelectComponent
  implements OnInit, ControlValueAccessor, AfterContentInit, OnDestroy
{
  /** Queries the HtmlInputElement of this component into an ElementRef obj */
  @ViewChild('trigger', { static: false }) trigger!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: false })
  triggerOptions!: CdkConnectedOverlay;

  @ViewChild('triggerOptions', { static: false })
  overlaryOptions!: ElementRef<HTMLElement>;

  @ContentChildren(forwardRef(() => SuperOptionComponent), {
    descendants: true,
  })
  optionElement!: QueryList<SuperOptionComponent & Highlightable>;

  @Output() valueChange: EventEmitter<{ value: any; isUserInput: boolean }> =
    new EventEmitter();

  @HostListener('click', ['$event']) onClick(_event: MouseEvent): void {}

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<any> =
    new EventEmitter<any>();

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: BooleanInput) {
    if (this._selectionModel) {
      throw getMatSelectDynamicMultipleError();
    }

    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple: boolean = false;

  tabIndex = 0;
  /** Value of the select control. */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    const hasAssigned = this._assignValue(newValue);
    if (hasAssigned) {
      this._onChange(newValue);
    }
  }
  private _value!: any;

  get isEmpty(): boolean {
    return Array.isArray(this._value) && this._value.length <= 0;
  }

  /** Value of the select control. */
  @Input()
  get arrowId(): any {
    return this._arrowId;
  }
  /** ID for the DOM node containing the select's value. */
  public _arrowId = `ui-select-id-${nextUniqueId++}`;

  /** Placeholder of the select (do not confuse it with the label that acts as a placeholder as well) */
  @Input()
  get placeholder(): string {
    // We need to return a string with a space as a workaround for the logic of the label to work
    return this._placeholder ? this._placeholder : ' ';
  }
  set placeholder(newplaceholder: string) {
    this._placeholder = newplaceholder;
  }
  private _placeholder = '';

  /** Label of the input */
  @Input()
  get label(): string {
    if (this._multiple) {
      const selectedOptions = this._selectionModel?.selected.map(
        (option) => option.title
      );

      if (this._isRtl()) {
        selectedOptions?.reverse();
      }

      // TODO(crisbeto): delimiter should be configurable for proper localization.
      return selectedOptions?.join(', ');
    }
    return this._selectionModel.selected[0]?.title;
  }

  set label(newLabel: string) {
    this._label = newLabel;
  }
  private _label = '';

  get selected(): SuperOptionComponent | SuperOptionComponent[] {
    return this.multiple
      ? this._selectionModel?.selected || []
      : this._selectionModel?.selected[0];
  }

  /** Emits whenever the component is destroyed. */
  protected readonly _destroy = new Subject<void>();
  set selectedMulti(newSelected: SuperOptionComponent[]) {
    this._selectedMulti = newSelected;
  }
  get selectedMulti() {
    return this._selectedMulti;
  }
  private _selectedMulti: SuperOptionComponent[] = [];

  /** Whether the select has a value. */
  get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  public get isRequired(): boolean {
    return Boolean(this.ngControl?.control?.hasValidator(Validators.required));
  }

  /** Whether the select is disabled. */
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value) ? true : null;
  }
  private _disabled: true | null = null;

  @Input() name!: string;
  @Input()
  public get first() {
    return this._first;
  }
  public set first(value) {
    this._first = value;
  }
  private _first = false;

  @Input()
  get width() {
    return this._width;
  }
  set width(value: number) {
    if (value) {
      this._width = value;
      this._renderer.setAttribute(
        this._elementRef.nativeElement,
        'style',
        `width:${this._width}px`
      );
    }
  }
  private _width!: number;

  @Input()
  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = SIZE[value as keyof typeof SIZE];
    this._changeDetector.markForCheck();
  }
  private _size = SIZE.medium;

  @Input()
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = STATUS[value as keyof typeof STATUS];
    this._changeDetector.markForCheck();
  }
  private _status = STATUS.default;

  @Input() loadInit = false;
  /** Whether the select is focused. */
  get focused(): boolean {
    return this._focused || this.isOpen;
  }
  private _focused = false;

  /** Whether the select has errors or not */
  get hasError(): boolean {
    return this._hasError;
  }
  set hasError(hasError: boolean) {
    this._hasError = hasError;
  }
  private _hasError = false;

  public get isOpen() {
    return this._isOpen;
  }
  public set isOpen(value) {
    if (this.isOpen !== value) {
      this._isOpen = value;
    }
  }

  /** Ideal origin for the overlay panel. */
  _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;

  /** Width of the overlay panel. */
  _overlayWidth!: number;
  //private _selectedOption!: SuperOptionComponent | null;

  overlayPanelClass = 'overlay-select';
  private _isOpen = false;
  labelMulti = '';

  private _keyManager!: ActiveDescendantKeyManager<SuperOptionComponent>;

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {};

  /** `View -> model callback called when select has been touched` */
  _onTouched: () => void = () => {};

  private _initialized = new Subject();

  /** Combined stream of all of the child options' change events. */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly optionSelectionChanges: Observable<OptionSelectionEvent> = defer(
    () => {
      const options = this.optionElement;

      if (options) {
        return options.changes.pipe(
          startWith(options),
          switchMap(() =>
            merge(
              ...options.map(
                (option: SuperOptionComponent) => option.onSelectionChange
              )
            )
          )
        );
      }

      return this._initialized.pipe(
        switchMap(() => this.optionSelectionChanges)
      );
    }
  ) as Observable<OptionSelectionEvent>;

  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  @Input()
  get compareWith() {
    return this._compareWith;
  }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function' && isDevMode()) {
      throw Error('`compareWith` must be a function.');
    }
    this._compareWith = fn;
    /*     this._initializeSelection();
     */
  }
  readonly stateChanges = new Subject<void>();

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => {
    if (o2 && typeof o2 === 'object') {
      return deepEqual(o1, o2);
    }
    return o1 === o2;
  };

  @Input() positionIco? = 'left';

  _selectionModel!: SelectionModel<SuperOptionComponent>;
  constructor(
    protected _viewportRuler: ViewportRuler,
    protected _changeDetector: ChangeDetectorRef,
    protected _ngZone: NgZone,
    protected _renderer: Renderer2,
    @Attribute('appearance') _appearance: string,

    private _dir: Directionality,
    @Self() @Optional() public ngControl: NgControl,
    public _elementRef: ElementRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this._selectionModel = new SelectionModel<SuperOptionComponent>(
      this.multiple
    );
    this.stateChanges.next();

    if (this.ngControl) {
      this.ngControl.statusChanges?.subscribe((status) => {
        if (status === 'VALID') {
          this.hasError = false;
        } else {
          this.hasError = true;
        }
        this._changeDetector.detectChanges();
      });
    }
  }
  ngOnDestroy(): void {
    this._keyManager?.destroy();
    this._destroy.next();
    this._destroy.complete();
    this.stateChanges.complete();
  }
  ngAfterContentInit(): void {
    this._initialized.next(null);
    this._initialized.complete();
    this._initKeyManager();

    this._selectionModel?.changed
      ?.pipe(takeUntil(this._destroy), distinctUntilChanged())
      .subscribe((event) => {
        event.added.forEach((option) => option?.select());
        event.removed.forEach((option) => option?.deselect());
      });
    this.optionElement.changes
      .pipe(startWith(null), takeUntil(this._destroy))
      .subscribe(() => {
        this._resetOptions();
        this._initializeSelection();
      });
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.ngControl) {
        this._value = this.ngControl.value;
      } else {
        this._value = this.optionElement.find(
          (option) => option.valueSelected
        )?.value;
      }
      this._setSelectionByValue(this._value);
      this.stateChanges.next();
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    this._selectionModel?.selected.forEach((option) =>
      option?.setInactiveStyles()
    );
    this._selectionModel.clear();

    if (this.multiple && value) {
      if (!Array.isArray(value) && typeof isDevMode === 'undefined') {
        throw getMatSelectNonArrayValueError();
      }
      value.forEach((currentValue: any) =>
        this._selectOptionByValue(currentValue)
      );
    } else {
      const correspondingOption = this._findOptionByValue(value);
      if (correspondingOption) {
        this._keyManager?.updateActiveItem(correspondingOption);
      } else if (!this.isOpen) {
        this._keyManager?.updateActiveItem(-1);
      }
    }

    this._changeDetector.markForCheck();
  }

  private _selectOptionByValue(value: any): SuperOptionComponent | undefined {
    const correspondingOption = this.optionElement.find(
      (option: SuperOptionComponent) => {
        // Skip options that are already in the model. This allows us to handle cases
        // where the same primitive value is selected multiple times.
        if (this._selectionModel.isSelected(option)) {
          return false;
        }

        try {
          // Treat null as a special reset value.
          return option.value != null && this._compareWith(option.value, value);
        } catch (error) {
          return false;
        }
      }
    );

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }
  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  protected _findOptionByValue(value: any): SuperOptionComponent | undefined {
    const correspondingOption = this.optionElement?.find(
      (option: SuperOptionComponent) => {
        try {
          if (this._selectionModel.isSelected(option)) {
            return false;
          }
          // Treat null as a special reset value.
          return option.value != null && this._compareWith(option.value, value);
        } catch (error) {
          if (isDevMode()) {
            // Notify developers of errors in their comparator fn.
            console.warn(error);
          }
          return false;
        }
      }
    ) as SuperOptionComponent;
    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }
    return correspondingOption;
  }
  /** Whether the element is in RTL mode. */
  _isRtl(): boolean {
    return this._dir ? this._dir.value === 'rtl' : false;
  }

  /**
   * Sync optiones with selected value
   * @param option
   */
  _onSelect(option: SuperOptionComponent, isUserInput: boolean): void {
    const wasSelected = this._selectionModel.isSelected(option);

    if (option.value == null && !this.multiple) {
      option.deselect();
      this._selectionModel.clear();
      if (this.value != null) {
        this._propagateChanges(option.value);
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected
          ? this._selectionModel.select(option)
          : this._selectionModel.deselect(option);
      }
      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }
      if (this._selectionModel.isSelected(option) && this.loadInit) {
        this._propagateChanges();
      }
      if (this.multiple) {
        if (isUserInput) {
          // In case the user selected the option with their mouse, we
          // want to restore focus back to the trigger, in order to
          // prevent the select keyboard controls from clashing with
          // the ones from `mat-option`.
          this.focus();
        }
      }
    }
    if (wasSelected !== this._selectionModel.isSelected(option) && !this.loadInit) {
      this._propagateChanges();
    }
  }

  /** Toggles the overlay panel open or closed. */
  toggle(event?: Event): void {
    this.isOpen ? this.close() : this.open();
    event?.stopPropagation();
  }

  _handleKeydown(event: KeyboardEvent) {
    if (!this.disabled) {
      this.isOpen
        ? this._handleOpenKeydown(event)
        : this._handleClosedKeydown(event);
    }
  }

  /** Handles keyboard events while the select is closed. */
  private _handleClosedKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey =
      keyCode === DOWN_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW;
    if (isArrowKey) {
      this._keyManager.onKeydown(event);
    }
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isTyping = manager.isTyping();

    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.close();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (
      !isTyping &&
      (keyCode === ENTER || keyCode === SPACE) &&
      manager.activeItem &&
      !hasModifierKey(event)
    ) {
      event.preventDefault();
      manager?.activeItem?.selectViaInteraction();
    } else {
      manager.onKeydown(event);
    }
  }

  /** Focuses the select element. */
  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }
  /** Whether the panel is allowed to open. */
  protected _canOpen(): boolean {
    return !this.isOpen && !this.disabled && this.optionElement?.length > 0;
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this._canOpen()) {
      this._keyManager.withHorizontalOrientation(null);
      this.isOpen = true;
    }
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this._onTouched();
      this._changeDetector.markForCheck();
    }
  }

  _onFocus() {
    if (!this.disabled) {
      this._focused = true;
    }
  }

  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur() {
    this._focused = false;

    if (!this.disabled && !this.isOpen) {
      this._onTouched();
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(newValue: string): void {
    this._assignValue(newValue);
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.detectChanges();
  }

  /**
   * Remove value when button close clikend
   */
  removeValue() {
    this.value = '';
  }

  /**
   * Manager event keyboard  for the options
   */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<SuperOptionComponent>(
      this.optionElement
    )
      .withWrap()
      .withVerticalOrientation()
      .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
      .withHomeAndEnd()
      .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.isOpen) {
        // Select the active item when tabbing away. This is consistent with how the native
        // select behaves. Note that we only want to do this in single selection mode.
        if (!this.multiple && this._keyManager.activeItem) {
          this._keyManager.activeItem._selectViaInteraction();
        }

        // Restore focus to the trigger before closing. Ensures that the focus
        // position won't be lost if the user got focus into the overlay.
        this.focus();
        this.close();
      }
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (!this.isOpen && !this.multiple && this._keyManager.activeItem) {
        this._keyManager.activeItem._selectViaInteraction();
      }
    });
  }

  /**
   *  Method that propagates the changes when the value changes
   */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.multiple) {
      valueToEmit = (this.selected as SuperOptionComponent[]).map(
        (option) => option.value
      );
    } else {
      valueToEmit = this.selected
        ? (this.selected as SuperOptionComponent).value
        : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit({ value: valueToEmit, isUserInput: true });
    this._onChange(valueToEmit);
    this.selectionChange.emit(this._getChangeEvent(valueToEmit));
    this._changeDetector.detectChanges();
  }
  private _getChangeEvent(valueToEmit: any): any {
    return new OptionSelectionChange(this, valueToEmit);
  }

  /**
   * Whether set  defualt value we assign value
   * @param newValue
   */
  private _assignValue(newValue: any | any[]) {
    // Always re-assign an array, because it might have been mutated.
    if (
      newValue !== this._value ||
      (this._multiple && Array.isArray(newValue))
    ) {
      if (this.optionElement) {
        this._value = newValue;
        this._setSelectionByValue(newValue);
      }
    }
    return false;
  }

  private _resetOptions() {
    const changedOrDestroyed = merge(this.optionElement.changes, this._destroy);

    this.optionSelectionChanges
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe((res) => {
        this._onSelect(res.source, res.isUserInput);
        if (res.isUserInput && this.isOpen && !this.multiple) {
          this.close();
          this.focus();
        }
      });
  }
}
export function getMatSelectDynamicMultipleError(): Error {
  return Error('Cannot change `multiple` mode of select after initialization.');
}

export function getMatSelectNonArrayValueError(): Error {
  return Error('Value must be an array in multiple-selection mode.');
}

/**
 * Compare objects
 *
 * @export
 * @param {*} object1
 * @param {*} object2
 * @returns
 */
function deepEqual(object1: any, object2: any): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    if (val1 !== val2) {
      return false;
    }
  }

  return true;
}
