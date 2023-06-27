import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import '@goeko/ui';

@NgModule({
	declarations: [DemoContainerComponent],
	imports: [CommonModule, DemoRoutingModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
