import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectI18nComponent } from './select-i18n.component';
import { ButtonModule, UiSuperSelectModule } from '@goeko/ui';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [SelectI18nComponent],
	imports: [CommonModule, ButtonModule, OverlayModule],
	exports: [SelectI18nComponent],
})
export class SelectI18nModule {}
