import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeGroupComponent } from './badge-group.component';
import { BadgeComponent } from './badge.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [BadgeComponent, BadgeGroupComponent],
  declarations: [BadgeComponent, BadgeGroupComponent],
  providers: [],
})
export class BadgeModule {}
