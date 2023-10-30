import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectI18nModule } from './components/select-i18n/select-i18n.module';

@NgModule({
	imports: [CommonModule, SelectI18nModule],
	exports: [SelectI18nModule],
})
export class BusinessUiModule {}
