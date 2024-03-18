import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject } from 'rxjs';
import { LoaderCircleComponent } from '../loader-animation/loader-circle/loader-circle.component';

@AutoUnsubscribe()
@Component({
  standalone: true,
  imports: [LoaderCircleComponent],
  selector: 'goeko-autenticate',
  templateUrl: './autenticate.html',
  styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _userServices: UserService, private _router: Router) {}

  ngOnInit(): void {
    this._userServices.completeLoadUser.subscribe((loadUser) => {
      if (loadUser) {
        this._redirectWhenLoadUser();
      }
    });
  }

  private _redirectWhenLoadUser() {
    if (this._userServices.userProfile().id) {
      this._redirectDashboard();
    } else {
      this._redirectProfile();
    }
  }

  private _redirectDashboard() {
    const userType = this._userServices.userType();
    this._router.navigate([`dashboard/${userType}`]);
  }
  private _redirectProfile() {
    const externalId = this._userServices.externalId();
    this._router.navigate([`profile/${externalId}`]);
  }
}
