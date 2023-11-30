import { AfterContentInit, AfterViewInit, Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
	selector: 'go-input',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: GoInputDirective,
			multi: true,
		},
	],
})
export class GoInputDirective implements AfterContentInit {
	@Input() readonly = false;
	@HostListener('change', ['$event.detail'])
	onHostChange(value: string) {
		this.value = value;
	}

	_onChange: (value: any) => void = () => {};
	_onTouched: (value?: any) => void = () => {};

	set value(value: string) {
		this._value = value;
		this.elementRef.nativeElement.value = this.value;

		this._onChange(value);
		this._onTouched(value);
	}
	get value() {
		return this._value;
	}

	private _value!: any;

	private get inputElementRef() {
		return this.elementRef.nativeElement.renderRoot.querySelectorAll('input')[0] as HTMLInputElement;
	}
	constructor(private elementRef: ElementRef) {}

	ngAfterContentInit(): void {
		if (!this.inputElementRef) {
			return;
		}
		this.inputElementRef.readOnly = this.readonly;
	}
	writeValue(value: any) {
		this._value = value;
		this.elementRef.nativeElement.value = value || '';
	}

	registerOnChange(fn: any) {
		this._onChange = fn;
	}

	registerOnTouched(fn: any) {
		this._onTouched = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.elementRef.nativeElement.disabled = isDisabled;
	}
}
