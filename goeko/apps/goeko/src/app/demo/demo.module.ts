import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import '@goeko/ui';
import { ButtonModule, CarouselComponent, CarouselModule, GoInputDirective, GoekoButtonModule } from '@goeko/ui';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DemoResultComponent } from './demo-result/demo-result.component';

@NgModule({
	declarations: [DemoContainerComponent, GoInputDirective, DemoResultComponent],
	imports: [CommonModule, DemoRoutingModule, CarouselModule, ReactiveFormsModule, GoekoButtonModule, ButtonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
