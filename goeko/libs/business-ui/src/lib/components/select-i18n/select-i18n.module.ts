import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectI18nComponent } from './select-i18n.component';
import { ButtonModule } from '@goeko/ui';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [SelectI18nComponent],
	imports: [CommonModule, ButtonModule, OverlayModule, TranslateModule],
	exports: [SelectI18nComponent],
})
export class SelectI18nModule {}
