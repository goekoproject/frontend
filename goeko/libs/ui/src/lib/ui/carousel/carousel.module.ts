import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CarouselComponent, GoSlideDirective } from './carousel.component'

@NgModule({
  declarations: [CarouselComponent, GoSlideDirective],
  imports: [CommonModule],
  exports: [CarouselComponent, GoSlideDirective],
})
export class CarouselModule {}
