import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from '@goeko/core';
import { UserService } from '@goeko/store';
import { BadgeModule, ButtonModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule, CommonModule, ButtonModule, BadgeModule],
  selector: 'goeko-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SideProfileComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('sideDialog') sideDialog!: ElementRef<HTMLDialogElement>;
  @Input()
  public get toogleSideProfile(): boolean {
    return this._toogleSideProfile;
  }
  public set toogleSideProfile(value: boolean) {
    this._toogleSideProfile = value;
  }
  private _toogleSideProfile!: boolean;

  public userProfile = this._userService.userProfile;

  @Input() visibility!: boolean;

  private _externalId!: string;
  public username!: string;

  public attractAtention!: boolean;
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (!this.userProfile().id) {
      this.toogleSideProfile = true;
      this._toogleDialog();
    }
    this._renderer.listen(this.sideDialog.nativeElement, 'click', () => {
      this.attractAtention = true;
    });
  }
  ngOnDestroy(): void {
    this.toogleSideProfile = false;
  }
  goToProfile() {
    this._router.navigate(['profile', this._externalId]);
  }
  private getIsPageProfile(): boolean {
    return this._router.url.includes('profile');
  }

  toogle() {
    this.toogleSideProfile = !this.toogleSideProfile;
    this._toogleDialog();
  }
  private _toogleDialog(): void {
    if (this.toogleSideProfile) {
      this.sideDialog?.nativeElement?.showModal();
    } else {
      this.sideDialog?.nativeElement?.close();
    }
    this.toogleSideProfile = this.sideDialog?.nativeElement.open;
  }
}
