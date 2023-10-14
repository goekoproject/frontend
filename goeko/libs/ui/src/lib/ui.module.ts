import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './ui/button/button.module';
import { TooltipModule } from './ui/tooltip/tooltip.module';
import { CarouselModule } from './ui/carousel/carousel.module';
import { GoekoButtonModule } from './ui/goeko-button/goeko-button.module';

@NgModule({
	imports: [CommonModule, ButtonModule, TooltipModule, CarouselModule, GoekoButtonModule],
	exports: [ButtonModule, TooltipModule, CarouselModule, GoekoButtonModule],
})
export class UiModule {}
