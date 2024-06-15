import { Component, OnInit, computed } from '@angular/core';
import { LANGS, Lang } from '@goeko/core';
import { UserService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'goeko-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  langs = LANGS;
  defaultLang!: Lang;
  userProfile = computed(() =>
    this._userService.userProfile().id
      ? this._userService.userProfile()
      : this._userService.userAuthData()
  );
  constructor(
    private _userService: UserService,
    private _translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.defaultLang = this.langs.find(
      (lang) => lang.code === this._translate.getDefaultLang()
    ) as Lang;
  }

  onChangeLangs(selectedLand: any) {
    this._translate.use(selectedLand.code);
  }
}
