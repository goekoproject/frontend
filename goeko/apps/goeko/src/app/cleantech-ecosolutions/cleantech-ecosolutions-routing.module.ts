import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component';
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component';
import { EcosolutionsFormComponent } from './ecosolutions-form/ecosolutions-form.component';

const routes: Routes = [
	{
		path: ':id',
		component: EcosolutionsMainComponent,
		children: [
			{
				path: '',
				component: EcosolutionsListComponent,
			},
			{
				path: 'new',
				component: EcosolutionsFormComponent,
			},
			{
				path: 'edit/:id',
				component: EcosolutionsFormComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CleantechEcosolutionsRoutingModule {}
