import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './ui/button/button.module';
import { TooltipModule } from './ui/tooltip/tooltip.module';
import { CarouselModule } from './ui/carousel/carousel.module';

@NgModule({
	imports: [CommonModule, ButtonModule, TooltipModule, CarouselModule],
	exports: [ButtonModule, TooltipModule, CarouselModule],
	declarations: [],
})
export class UiModule {}
