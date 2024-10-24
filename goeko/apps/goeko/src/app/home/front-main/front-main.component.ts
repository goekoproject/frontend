import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, effect, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { HomeService } from '../home.service'
import { DialogService } from '@goeko/ui'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'
import { Router } from '@angular/router'
import { ContentFulService } from '@goeko/store'
import { map } from 'rxjs'

enum ENTRYS_ID {
  MAIN = '6kOjxhcZv8tluQqyVzMglp',
  CONNECTING = '5K722xUKUczzRHt5COUgLp',
  SUSTAINABILITY = '2hwIsU3aiyyd2RhzFIgvw0',
}
const CONTENT_TYPE_MAIN_PHOTO = 'mainPhoto';

@Component({
  selector: 'front-main',
  templateUrl: './front-main.component.html',
  styleUrls: ['./front-main.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FrontMain implements OnInit {

  private _contentFulService = inject(ContentFulService)
  public mainPhoto$ = this._contentFulService.getContentType(CONTENT_TYPE_MAIN_PHOTO).pipe(map((items) => items.items));
  public mainPhoto!: any;

  @ViewChild('goekoText') goekoText!: ElementRef;

  public entryDataConnecting!: { text: string }
  public entryDataMain!: { text: string }

  currentLang!: string;
  slogan!: { text: string }
  slogan2!: { text: string }
  showMainSlogan!: boolean;

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
    private _dialogService: DialogService,
    private _router: Router
  ) {
    this._effectActors()
  }


  ngOnInit(): void {
    this._loadMainPhoto();
    this.currentLang = this._translate.defaultLang
    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
    this._homeService.getSloganMain(ENTRYS_ID.MAIN)
    this._onChangeLang()
  }

  private _effectActors() {
    effect(() => {
      this.entryDataConnecting = this._homeService.entryDataConnecting()
      this.entryDataMain = this._homeService.entryDataMain()
      this.goekoText.nativeElement.addEventListener('animationstart', () => {
        this.showMainSlogan = true;
      });
      this.goekoText.nativeElement.addEventListener('animationend', () => {
        this.goekoText.nativeElement.style.visibility = 'hidden';
      });
    })
  }

  _loadMainPhoto() {
    this.mainPhoto$.subscribe((items:any) => {

      this.mainPhoto = items[0].fields.photo.fields.file.url
      console.log(this.mainPhoto);
    });
  }

  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
      this._homeService.getSloganMain(ENTRYS_ID.MAIN)
      this.currentLang = res.lang
    })
  }

  openRequestDemoDialog() {
    this._dialogService
      .open(RequestDemoDialogComponent)
      .afterClosed()
      .subscribe((isAccepted) => {
      })
  }

  goTologin() {
    this._router.navigate(['/login/signup'])
  }

}
