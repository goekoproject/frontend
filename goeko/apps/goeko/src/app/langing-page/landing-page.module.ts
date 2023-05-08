import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangingPageComponent } from './langing-page.component';
const router = [
	{
		path: '',
		component: LangingPageComponent,
	},
];
@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [],
	declarations: [LangingPageComponent],
	providers: [],
})
export class LandingModule {}
