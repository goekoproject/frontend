import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@goeko/core';

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
    return this.router.url.includes('home') || this.router.url.includes('demo');
  }

  get isDemo() {
    return this.path?.includes('demo');
  }

  public isAuthenticated$ = this._authService.isAuthenticated$;
  public isPrivateZone: boolean = false;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isPrivateZone = isAuthenticated && !this.isHomePage();
    });
  }
  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true');
  }
}
