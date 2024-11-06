import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CategoryComponent } from './category.component'
import { CountProductsPipe } from './count-products.pipe'

@NgModule({
  imports: [CommonModule, AngularSvgIconModule.forRoot(), CountProductsPipe],
  exports: [CategoryComponent],
  declarations: [CategoryComponent],
  providers: [],
})
export class CategoryModule {}
