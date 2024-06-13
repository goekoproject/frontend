import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '@goeko/core';

function gotTOPageEmailVerify() {
  return() => {
    const urlAutenticateDecoe = decodeURI(window.location.search);
    const _authService = inject(AuthService);
    const urlPageEmailVerify = `${window.location.origin}/verify-email`;
    if(urlAutenticateDecoe.includes('verify')) {
      _authService.logout(urlPageEmailVerify);
   }
  }

}


const ROUTES: Routes = [
  {
    path: '',
    canMatch: [gotTOPageEmailVerify],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
   {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then((m) =>m.PlatformModule)
   },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./shell/verify-email.component').then((m) => m.VerifyEmailComponent),
  },
   {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100], // [x, y]
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
