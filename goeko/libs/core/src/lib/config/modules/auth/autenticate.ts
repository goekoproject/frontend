import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderCircleComponent } from './loader-animation/loader-circle/loader-circle.component';

@Component({
  standalone: true,
  imports: [LoaderCircleComponent],
  selector: 'goeko-autenticate',
  templateUrl: './autenticate.html',
  styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
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
    }
  }
}
