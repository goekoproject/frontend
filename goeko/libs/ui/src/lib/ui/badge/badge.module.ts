import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BadgeComponent } from './badge.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeGroupComponent } from './badge-group.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	exports: [BadgeComponent, BadgeGroupComponent],
	declarations: [BadgeComponent, BadgeGroupComponent],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeModule {}
