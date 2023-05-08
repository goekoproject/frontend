import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './ui/button/button.module';
import { TooltipModule } from './ui/tooltip/tooltip.module';

@NgModule({
	imports: [CommonModule, ButtonModule, TooltipModule],
	exports: [ButtonModule, TooltipModule],
})
export class UiModule {}
