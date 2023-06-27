import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';

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
		path: '',
		component: DemoContainerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DemoRoutingModule {}
