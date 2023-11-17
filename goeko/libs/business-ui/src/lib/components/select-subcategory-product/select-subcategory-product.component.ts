import { CommonModule } from '@angular/common';
import {
	AfterContentInit,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	Input,
	NgZone,
	Optional,
	Provider,
	Query,
	QueryList,
	Self,
	ViewChild,
	forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, BadgeGroupComponent, BadgeModule, GoInputModule, OptionSelectionEvent } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, defer, merge, startWith, switchMap, take } from 'rxjs';
const CONTROL_VALUE_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectSubcategoryProductComponent),
	multi: true,
};

type TYPE_INPUT = 'radio' | 'checkbox';
enum TYPE_FIELD {
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
}
@Component({
	standalone: true,
	imports: [BadgeModule, CommonModule, ReactiveFormsModule, TranslateModule, GoInputModule],
	providers: [CONTROL_VALUE_ACCESSOR],
	selector: 'goeko-select-subcategory-product',
	templateUrl: './select-subcategory-product.component.html',
	styleUrls: ['./select-subcategory-product.component.scss'],
})
export class SelectSubcategoryProductComponent implements ControlValueAccessor, AfterContentInit {
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

	public type: TYPE_INPUT = 'radio';
	public disabled = false;
	public value!: any;
	public open = false;
	public selected!: BadgeComponent[];
	private _multiple!: boolean;

	get numSelected(): number {
		this._numSelected = this.selected?.length;
		return this._numSelected;
	}

	set numSelected(value: number) {
		this._numSelected = value;
	}

	private _numSelected!: number;

	get labelSelected(): string {
		return this.selected?.map((select) => select.label)?.toString();
	}

	_onChange: (value: any) => void = () => {};
	_onTouched: (value?: any) => void = () => {};

	constructor() {}

	ngAfterContentInit(): void {
		this.badgeGroup.valueChangedBadge$.subscribe((badge) => {
			this.selected = this.badgeGroup.selected;
			this._handleCheckSubcategoryWhenProductSelected();
		});
	}

	private _handleCheckSubcategoryWhenProductSelected() {
		if (this.numSelected <= 0) {
			return;
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

	assignValue(value: any): void {
		this._cleanValue();
		if (typeof value === 'string' && this.subCategory.controlName === value) {
			this.value = this.subCategory;
		} else {
			this.value = value;
		}
		this.open = !this.open;
		this._onChange(this.value);
		this._onTouched();
	}

	private _cleanValue() {
		if (this.type === TYPE_FIELD.CHECKBOX) {
			return;
		}

		this.value = '';
		this.open = false;
	}

	toogle(value: any) {
		this.open = !this.open;
		this._onChange(value);
	}
}
