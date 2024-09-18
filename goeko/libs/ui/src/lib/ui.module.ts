import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './ui/button/button.module';
import { CarouselModule } from './ui/carousel/carousel.module';
import { GoekoButtonModule } from './ui/goeko-button/goeko-button.module';
import { TitlePageComponent } from './ui/title-page/title-page.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CarouselModule,
    GoekoButtonModule,
    TitlePageComponent,
  ],
  exports: [
    ButtonModule,
    CarouselModule,
    GoekoButtonModule,
    TitlePageComponent,
  ],
  declarations: [],
})
export class UiModule {}
