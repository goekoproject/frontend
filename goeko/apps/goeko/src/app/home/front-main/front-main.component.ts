import { Component, OnInit, ViewEncapsulation, effect } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { HomeService } from '../home.service'
import { DialogService } from '@goeko/ui'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'

enum ENTRYS_ID {
  MAIN = '6kOjxhcZv8tluQqyVzMglp',
  CONNECTING = '5K722xUKUczzRHt5COUgLp',
  SUSTAINABILITY = '2hwIsU3aiyyd2RhzFIgvw0',
}

@Component({
  selector: 'front-main',
  templateUrl: './front-main.component.html',
  styleUrls: ['./front-main.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FrontMain implements OnInit {

  public entryDataConnecting!: { text: string }
  //public entryDataSustainability!: { text: string }
  public entryDataMain!: { text: string }

  currentLang!: string

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
    private _dialogService: DialogService,
  ) {
    this._effectActors()
  }

  ngOnInit(): void {
    this.currentLang = this._translate.defaultLang

    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
    this._homeService.getSloganMain(ENTRYS_ID.MAIN)

    this._onChangeLang()

  }

  private _effectActors() {
    effect(() => {
      this.entryDataConnecting = this._homeService.entryDataConnecting()
     // this.entryDataSustainability = this._homeService.entryDataSustainability()
      this.entryDataMain = this._homeService.entryDataMain()
    })
  }


  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      //this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
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
}
