import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeadsComponent } from './leads.component';
import { leadRoutes } from './leads.route';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(leadRoutes)
    ],
    declarations: [LeadsComponent]
})
export class LeadsModule { }