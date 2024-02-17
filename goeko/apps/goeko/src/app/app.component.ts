import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadDataUser } from '@goeko/business-ui';
import { AuthService } from '@goeko/core';
import { take } from 'rxjs';

const KEY_COOKIES = 'cookie-policy';
@Component({
  selector: 'goeko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public path!: string;

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES);
  }

  isHomePage() {
    return location.pathname.includes('home') || location.pathname
    .includes('demo') || location.pathname
    === '/';
  }

  get isDemo() {
    return this.path?.includes('demo');
  }

  public isAuthenticated$ = this._authService.isAuthenticated$;
  public isPrivateZone: boolean = false;

  constructor(private router: Router, private _authService: AuthService,private loadDataUser: LoadDataUser) {}

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isPrivateZone = isAuthenticated && !this.isHomePage();
      console.log(this.isPrivateZone);
      if(this.isPrivateZone) {
        this.loadDataUser.resolve().pipe(take(1)).subscribe();
      }     

    });


  }
  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true');
  }
}
