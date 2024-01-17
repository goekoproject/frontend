import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderCircleComponent } from './loader-animation/loader-circle/loader-circle.component';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { UserContextService } from '../../../user-context/user-context.service';
import { UserService } from '@goeko/store';

@Component({
  standalone: true,
  imports: [LoaderCircleComponent],
  selector: 'goeko-autenticate',
  templateUrl: './autenticate.html',
  styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private auth: Auth0,
    private readonly userServices: UserService
  ) {}
  ngOnInit(): void {
    this.auth.user$.subscribe((userData) => {
      if (userData) {
        const userDataTransform = {
          ...userData,
          externalId: userData?.sub?.replace('auth0|', ''),
        };
        this.userServices.user.set(userDataTransform);
        this._router.navigate([`dashboard/${userData['userType']}`]);
      }
    });
    /*  this.auth
      .getAccessTokenSilently({ detailedResponse: true })
      .subscribe((result) => {
        console.log(result);
      }); */

    /* 
    if (location.hash) {
      combineLatest({
        isResolverHash: this._authService.handlerAuthtentication(location.hash),
        authData: this._authService.authData,
      }).subscribe({
        next: (result) => {
          if (result.isResolverHash && result.authData) {
            setTimeout(
              () =>
                this._router.navigate([
                  `dashboard/${result.authData?.userType}`,
                ]),
              1500
            );
          }
        },
        complete: () => console.log('Completado'),
      });
    } */
  }
}
