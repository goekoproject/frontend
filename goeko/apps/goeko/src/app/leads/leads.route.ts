import { Route } from "@angular/router";
import { LeadsComponent } from "./leads.component";

export const leadRoutes: Route[]= [
/*     {
        path: '',
        component: LeadsComponent
    }, */
    {
        path: '',
        loadComponent: () => import('./leads-list.component').then((c) => c.LeadsListComponent),
        data: {
			breadcrumb: 'leads',
		},

    }
]