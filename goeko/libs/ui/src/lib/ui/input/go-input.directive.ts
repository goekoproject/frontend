import { Directive, ElementRef, HostListener } from '@angular/core';
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
export class GoInputDirective {
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

	constructor(private elementRef: ElementRef) {}

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
