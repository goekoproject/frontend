import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'go-switch',
	templateUrl: './switch.component.html',
	styleUrls: ['./switch.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true,
		},
	],
})
export class SwitchComponent implements ControlValueAccessor {
	@Input() offLabel!: string;
	@Input() onLabel!: string;

	@Output() valueChanged: EventEmitter<boolean> = new EventEmitter();

	isOn = true;

	// Implementación de ControlValueAccessor
	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(value: any): void {
		this.isOn = value;
		this.valueChanged.emit(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	toggleSwitch() {
		this.isOn = !this.isOn;
		this.onChange(this.isOn);
		this.valueChanged.emit(this.isOn);
		this.onTouched();
	}
}
