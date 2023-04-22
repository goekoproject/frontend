import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
	declarations: [TooltipComponent],
	imports: [CommonModule],
	exports: [TooltipComponent],
})
export class TooltipModule {}
