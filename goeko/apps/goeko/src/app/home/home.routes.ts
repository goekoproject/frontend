import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentLegalComponent } from './document-legal/document-legal.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about/about.component';

const ENTRY_ID_COOKIES_POLICY = '6Cby4WysXPnj3OJQBSj4pB';
const ENTRY_ID_PRIVACY_POLICY = '6pwHwtZC1ILfXS0awq85Oy';
const ENTRY_ID_ABOUT = '4A61zIPlLwyWIVTL9DQB0U';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'cookies-policy',
        component: DocumentLegalComponent,
        data: {
          entryId: ENTRY_ID_COOKIES_POLICY,
        },
      },
      {
        path: 'privacy-policy',
        component: DocumentLegalComponent,
        data: {
          entryId: ENTRY_ID_PRIVACY_POLICY,
        },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          entryId: ENTRY_ID_ABOUT,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouteModule {}
