import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { DemoResultComponent } from './demo-result/demo-result.component';

const routes: Routes = [
	{
		path: '',
		component: DemoContainerComponent,
	},
	{
		path: ':actor',
		component: DemoContainerComponent,
	},
	{
		path: ':actor/result',
		component: DemoResultComponent,
	},
	{
		path: '',
		component: DemoContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DemoRoutingModule {}
