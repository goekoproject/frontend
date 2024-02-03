import { AfterContentInit, Component, OnInit, computed } from '@angular/core';
import { SideProfileComponent } from '@goeko/business-ui';
import { LANGS, Lang } from '@goeko/core';
import { UserService } from '@goeko/store';
import { DialogService } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'goeko-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit, AfterContentInit {
  langs = LANGS;
  defaultLang!: Lang;
  userProfile = computed(() =>
    this._userService.userProfile().id
      ? this._userService.userProfile()
      : this._userService.userAuthData()
  );
  constructor(
    private _userService: UserService,
    private _translate: TranslateService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.defaultLang = this.langs.find(
      (lang) => lang.code === this._translate.getDefaultLang()
    ) as Lang;
  }

  ngAfterContentInit(): void {
    if (!this._userService.userProfile().id) {
      this.toogleSideProfile();
    }
  }
  onChangeLangs(selectedLand: any) {
    this._translate.use(selectedLand.code);
  }

  toogleSideProfile() {
    return this._dialogService.openDialog<SideProfileComponent>(
      SideProfileComponent
    );
  }
}
