import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './ui/button/button.module';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [ButtonModule]
})
export class UiModule {}
