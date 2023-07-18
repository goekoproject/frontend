import { FocusableOption, FocusOrigin, Highlightable } from '@angular/cdk/a11y';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { BaseSelectComponent } from '../super-select/base-select.component';
import { SUPER_SELECT_TOKEN } from './../super-select-token';
import { SuperOptionComponent } from './super-option.component';

export class OptionSelectionChange<T = any> {
	constructor(
		/** Reference to the option that emitted the event. */
		public source: T,
		/** Whether the change in the option's value was a result of a user action. */
		public isUserInput = false
	) {}
}
let _uniqueIdCounter = 0;

@Directive()
export abstract class BaseOptionComponent implements FocusableOption, Highlightable {
	/** Value of the select control. */
	@Input()
	get value(): any {
		return this._value;
	}
	set value(newValue: any) {
		if (newValue !== this._value) {
			this._value = newValue;
		}
	}
	public _value = '';
	@Input() titleMulti? = '';
	@Input() valueMulti!: string | number | undefined;
	@Input()
	public get selected(): any {
		return this._selected;
	}
	public set selected(value: any) {
		this._selected = value;
	}
	private _selected = false;

	@Input()
	public get valueSelected(): any {
		return this._valueSelected;
	}
	public set valueSelected(value: any) {
		this._valueSelected = value;
		this.selected = true;
		this.select();
		this._changeDetector.detectChanges();
	}
	private _valueSelected: any;

	@Input()
	public get displayName(): any {
		return this._displayName;
	}
	public set displayName(value: any) {
		this._displayName = value;
	}
	private _displayName!: any;

	/** Whether the wrapping component is in multiple selection mode. */
	get multiple() {
		return this.uiSelect && this.uiSelect.multiple;
	}

	/** The unique ID of the option. */
	@Input() id = `ui-option-${_uniqueIdCounter++}`;

	/** Event emitted when the option is selected or deselected. */
	// tslint:disable-next-line:no-output-on-prefix
	@Output() readonly onSelectionChange = new EventEmitter<OptionSelectionChange<BaseOptionComponent>>();

	public get title() {
		return this.displayName ? this.displayName : this._getHostElement()?.textContent;
	}

	uiSelect: BaseSelectComponent;

	private _activeOption = false;
	@Input() disabled!: boolean;

	_Focus(event: any) {}
	constructor(
		@Optional() @Inject(SUPER_SELECT_TOKEN) uiSelect: BaseSelectComponent,
		private _element: ElementRef,
		private readonly _changeDetector: ChangeDetectorRef
	) {
		this.uiSelect = uiSelect;
	}

	setActiveStyles(): void {
		this._activeOption = true;
		this._changeDetector.markForCheck();
	}
	setInactiveStyles(): void {
		this._activeOption = false;
		this._changeDetector.markForCheck();
	}

	focus(_origin?: FocusOrigin, options?: FocusOptions): void {
		const element = this._getHostElement();
		if (typeof element.focus === 'function') {
			element.focus(options);
		}
	}

	_onMouseenter() {
		this._activeOption = true;
	}

	_onMouseleave() {
		this._activeOption = false;
	}

	selectViaInteraction(): void {
		if (!this.disabled) {
			this._activeOption = true;
			this._changeDetector.markForCheck();
			this.focus();
			this._emitSelectionChangeEvent(true);
		}
	}

	_handleKeydown(event: KeyboardEvent) {
		if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
			this.selectViaInteraction();
			event.preventDefault();
		}
	}

	/** Returns the correct tabindex for the option depending on disabled state. */
	_getTabIndex(): string {
		return this.disabled ? '-1' : '0';
	}
	/** Gets the host DOM element. */
	private _getHostElement(): HTMLElement {
		return this._element.nativeElement;
	}

	/** Selects the option. */
	public select(): void {
		if (!this._selected) {
			this._selected = true;
			this._changeDetector.markForCheck();
			this._emitSelectionChangeEvent();
		}
	}

	/** Deselects the option. */
	public deselect(): void {
		if (this._selected) {
			this._selected = false;
			this._changeDetector.markForCheck();
			this._emitSelectionChangeEvent();
		}
	}

	/** Emits the selection change event. */
	private _emitSelectionChangeEvent(userInput = false): void {
		this.onSelectionChange.emit(new OptionSelectionChange(this, userInput));
	}
	/**
	 * `Selects the option while indicating the selection came from the user. Used to
	 * determine if the select's view -> model callback should be invoked.`
	 */
	_selectViaInteraction(): void {
		if (!this.disabled) {
			this._selected = this.multiple ? !this._selected : true;
			this._changeDetector.markForCheck();
			this._emitSelectionChangeEvent(true);
		}
	}
}

export interface OptionSelectionEvent {
	source: SuperOptionComponent;
	isUserInput: boolean;
}
