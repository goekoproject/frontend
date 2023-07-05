import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent, GoSlideDirective } from './carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [CarouselComponent, GoSlideDirective],
	imports: [CommonModule],
	exports: [CarouselComponent, GoSlideDirective],
})
export class CarouselModule {}
