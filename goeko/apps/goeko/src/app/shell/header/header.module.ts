import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ButtonModule } from '@goeko/ui';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,ButtonModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
