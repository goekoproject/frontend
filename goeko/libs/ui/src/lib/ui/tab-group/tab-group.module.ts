import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';
import { UiTabComponent } from './tab/tab.component';

@NgModule({
	imports: [CommonModule],
	exports: [TabGroupComponent, UiTabComponent],
	declarations: [TabGroupComponent, UiTabComponent],
	providers: [],
})
export class GoTabGroupModule {}
