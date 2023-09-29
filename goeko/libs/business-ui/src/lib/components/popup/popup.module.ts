import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { ButtonModule } from '@goeko/ui';

@NgModule({
	declarations: [PopupComponent],
	imports: [CommonModule, ButtonModule],
	exports: [PopupComponent],
})
export class PopupModule {}
