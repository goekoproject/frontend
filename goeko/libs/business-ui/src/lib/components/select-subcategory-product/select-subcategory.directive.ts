import {
	AfterContentInit,
	ChangeDetectorRef,
	Directive,
	ElementRef,
	Host,
	HostListener,
	Renderer2,
} from '@angular/core';
import { SelectSubcategoryProductComponent, TYPE_FIELD } from './select-subcategory-product.component';
/**
 * To Control input radio element when it is checked and its have the focus then
 * it is selected the goeko-select-subcategory-product component that have to open.
 */
@Directive({ selector: '[goekoSelectSubcategoryProduct]', standalone: true })
export class SelectSubcategoryProductDirective implements AfterContentInit {
	get wrappersSubCategory(): Array<any> {
		return this._elementRef?.nativeElement?.parentElement?.parentElement.querySelectorAll(
			'goeko-select-subcategory-product'
		);
	}
	get inputElement(): HTMLInputElement {
		return this._elementRef?.nativeElement?.querySelector('input');
	}

	@HostListener('input', ['$event.target']) onChangeInputRadio(inputElement: HTMLInputElement) {
		if (inputElement.type === TYPE_FIELD.RADIO) {
			this._showSubCategorySelected(inputElement);
		}
	}

	constructor(
		private _elementRef: ElementRef,
		private _renderer: Renderer2,
		private _cdf: ChangeDetectorRef,
		@Host() public selectSubcategoryProductComponent: SelectSubcategoryProductComponent
	) {}

	ngAfterContentInit(): void {
		this._onFocusElement();
	}

	private _onFocusElement() {
		if(!this.inputElement) {
			return;
		}
		this._renderer.listen(this.inputElement, 'focus', (inputElement) => {
			if (inputElement.type === TYPE_FIELD.RADIO) {
				this._showSubCategorySelected(inputElement.srcElement);
			}
		});
	}

	private _showSubCategorySelected(inputElement: HTMLInputElement) {
		this.wrappersSubCategory.forEach((subCategoryProduct) => {
			this._renderer.setAttribute(subCategoryProduct, 'checked', 'false');
			this._renderer.setAttribute(subCategoryProduct, 'open', 'false');

			if (subCategoryProduct.contains(inputElement)) {
				this._renderer.setAttribute(subCategoryProduct, 'open', 'true');
				this._renderer.setAttribute(subCategoryProduct, 'checked', 'true');
				this._cdf.detectChanges();
			}
		});
	}
}
