import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component';
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component';

const routes: Routes = [
	{
		path: ':id',
		component: EcosolutionsMainComponent,
		children: [
			{
				path: '',
				component: EcosolutionsListComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CleantechEcosolutionsRoutingModule {}
