import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectI18nModule } from './components/select-i18n/select-i18n.module';
import { SelectSubcategoryProductComponent } from './components/select-subcategory-product/select-subcategory-product.component';

@NgModule({
	imports: [CommonModule, SelectI18nModule],
	exports: [SelectI18nModule],
	declarations: [SelectSubcategoryProductComponent],
})
export class BusinessUiModule {}
