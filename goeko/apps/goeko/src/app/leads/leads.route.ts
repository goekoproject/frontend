import { Route } from '@angular/router'

export const leadRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./leads-list.component').then((c) => c.LeadsListComponent),
    data: {
      breadcrumb: 'leads',
    },
  },
]
