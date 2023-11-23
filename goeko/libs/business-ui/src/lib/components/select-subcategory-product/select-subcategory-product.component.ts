import { CommonModule } from '@angular/common';
import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnDestroy,
	Provider,
	ViewChild,
	ViewEncapsulation,
	forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, BadgeGroupComponent, BadgeModule, GoInputModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { SelectSubcategoryProductDirective } from './select-subcategory.directive';
const CONTROL_VALUE_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectSubcategoryProductComponent),
	multi: true,
};

type TYPE_INPUT = 'radio' | 'checkbox';
export enum TYPE_FIELD {
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
}
@Component({
	standalone: true,
	imports: [
		BadgeModule,
		CommonModule,
		ReactiveFormsModule,
		TranslateModule,
		GoInputModule,
		SelectSubcategoryProductDirective,
	],
	providers: [CONTROL_VALUE_ACCESSOR],
	selector: 'goeko-select-subcategory-product',
	templateUrl: './select-subcategory-product.component.html',
	styleUrls: ['./select-subcategory-product.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		'[attr.open]': 'open',
		'[attr.checked]': 'checked',
	},
})
export class SelectSubcategoryProductComponent
	implements ControlValueAccessor, AfterContentInit, AfterViewInit, OnDestroy
{
	@ContentChild(BadgeGroupComponent) badgeGroup!: BadgeGroupComponent;
	@ViewChild('inputElement') inputElement!: ElementRef;

	@Input() subCategory: any;
	@Input()
	public get multiple(): boolean {
		return this._multiple;
	}
	public set multiple(value: boolean) {
		this._multiple = value;
		this.type = value ? 'checkbox' : 'radio';
	}
	private _multiple!: boolean;

	public type: TYPE_INPUT = 'radio';
	public disabled = false;

	private _value!: any;
	public get value(): any {
		return this._value;
	}
	public set value(value: any) {
		this._value = value;
	}

	private _open = false;
	public get open() {
		return this._open;
	}
	public set open(value: boolean) {
		if (!value) {
			this.badgeGroup._selectionModel.clear();
		}
		this._open = value;
		this._cdf.markForCheck();
	}

	public get selected(): BadgeComponent[] {
		this._cdf.markForCheck();
		if (!this.open) {
			this.badgeGroup._selectionModel.clear();
		}
		return this.badgeGroup?.selected;
	}

	get labelSelected(): string {
		this._cdf.markForCheck();
		return this.selected?.map((select) => select.label)?.toString();
	}

	private _numSelected!: number;
	get numSelected(): number {
		this._numSelected = this.selected?.length;
		return this._numSelected;
	}
	set numSelected(value: number) {
		this._numSelected = value;
	}

	private _checked = false;
	public get checked() {
		this._cdf.markForCheck();
		return this._checked;
	}
	public set checked(value) {
		this._checked = value;
	}
	private mutationObserver!: MutationObserver;

	_onChange: (value: any) => void = () => {};
	_onTouched: (value?: any) => void = () => {};

	constructor(private _cdf: ChangeDetectorRef, private _el: ElementRef) {}

	ngAfterContentInit(): void {
		this.badgeGroup.valueChangedBadge$.subscribe((badge) => {
			this._handleCheckSubcategoryWhenProductSelected();
		});
	}

	ngAfterViewInit() {
		this._handlerMutationObserver();
		this._cdf.markForCheck();
	}

	ngOnDestroy() {
		// Detener la observación cuando el componente se destruye
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
		}
	}
	writeValue(value: any): void {
		if (!value) {
			return;
		}
		this.assignValue(value);
	}
	registerOnChange(fn: (value: any) => void): void {
		this._onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this._onTouched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	private _onFocus() {
		this.inputElement.nativeElement.focus();
	}
	private _handlerMutationObserver() {
		// Configuración de MutationObserver con una función de retorno de llamada
		this.mutationObserver = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
					const isChecked = Boolean(this._el.nativeElement.getAttribute('checked') === 'true');
					if (!isChecked) {
						this.open = false;
					} else {
						this.open = true;
					}
					this._cdf.markForCheck();
				}
			}
		});

		// Observar cambios en atributos del elemento host
		this.mutationObserver.observe(this._el.nativeElement, { attributes: true });
	}
	private _handleCheckSubcategoryWhenProductSelected() {
		if (this.numSelected <= 0) {
			return;
		}
	}
	onRestValue(): void {
		setTimeout(() => {
			this.open = this.inputElement?.nativeElement.checked || false;
		});
	}

	assignValue(value: string): void {
		if (this.subCategory.controlName === value) {
			this.value = this.subCategory;
			this.checked = true;

			// this will make the execution after the above boolean has changed
			this._onFocus();
			this._onChange(this.value);
			this._onTouched();
			this._cdf.markForCheck();
		}
	}

	public cleanValue() {
		if (this.type === TYPE_FIELD.CHECKBOX) {
			return;
		}

		this.value = '';
		this.badgeGroup._selectionModel.clear();
	}

	toogle(value: any) {
		this.open = !this.open;
		if (this.open) {
			this._onFocus();
		}
		this._onChange(value);
		this._cdf.markForCheck();
	}
}
