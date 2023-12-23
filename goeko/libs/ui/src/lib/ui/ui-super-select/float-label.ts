import { ViewChild, ElementRef, HostListener, Directive, AfterViewInit } from '@angular/core';

@Directive()
export abstract class FloatLabelSelect implements AfterViewInit {
	@ViewChild('labelElement', { static: false }) labelElement!: ElementRef;
	@ViewChild('input', { static: false }) inputElement!: ElementRef;
	canFloatingLabel = true;

	@HostListener('focusout', ['$event']) onFocusout(): void {
		if (!this.inputElement?.nativeElement.value && !this.inputElement?.nativeElement.disabled && this.canFloatingLabel) {
			this.setFloatLabel(false);
		}
	}

	@HostListener('click', ['$event']) _onClick(): void {
		if (!this.inputElement?.nativeElement.disabled && this.canFloatingLabel) {
			this.setFloatLabel(true);
			this.inputElement?.nativeElement.focus();
		}
	}
	constructor() {
	}

	ngAfterViewInit() {
		this.labelElement.nativeElement.style['font-size'] = '15px';
	}

	/**
	 * Method that sets the float label
	 * @param floating boolean
	 */
	setFloatLabel(floating: boolean): void {
		if (!this.canFloatingLabel) {
			return;
		}
		if (!this.labelElement) {
			return;
		}
		if (floating && this.labelElement) {
			this.labelElement.nativeElement.style['font-size'] = '13px';
			this.labelElement.nativeElement.style['transform'] = 'translateY(0.9px)';
		} else {
			this.labelElement.nativeElement.style['font-size'] = '15px';
			this.labelElement.nativeElement.style['transform'] = 'translateY(9px)';
		}
	}
}
