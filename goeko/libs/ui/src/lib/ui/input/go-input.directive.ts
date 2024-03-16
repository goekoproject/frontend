import { AfterContentInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => GoInputDirective),
	multi: true,
};
@Directive({
	selector: 'go-input',
	providers: [CONTROL_VALUE_ACCESSOR],
})
export class GoInputDirective implements AfterContentInit, ControlValueAccessor {
	@Input() readonly = false;
	@Output() valueChange = new EventEmitter();
	@HostListener('change', ['$event.detail'])
	onHostChange(value: string) {
		this.value = value;
		this.valueChange.emit(value);
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
