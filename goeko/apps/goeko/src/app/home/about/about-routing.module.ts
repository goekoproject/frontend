import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoekoButtonModule } from '@goeko/ui';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild(routes), GoekoButtonModule, RouterModule],
	exports: [RouterModule],
})
export class AboutRoutingModule {}
