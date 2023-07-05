import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import '@goeko/ui';
import { CarouselComponent, CarouselModule } from '@goeko/ui';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@NgModule({
	declarations: [DemoContainerComponent],
	imports: [CommonModule, DemoRoutingModule, CarouselModule, ReactiveFormsModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
