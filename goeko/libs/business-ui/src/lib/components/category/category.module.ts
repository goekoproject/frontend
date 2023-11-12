import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from '@goeko/ui';

@NgModule({
	imports: [CommonModule, AngularSvgIconModule.forRoot()],
	exports: [CategoryComponent],
	declarations: [CategoryComponent],
	providers: [],
})
export class CategoryModule {}
