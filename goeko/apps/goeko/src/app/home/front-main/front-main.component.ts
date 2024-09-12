import { Component, OnInit, ViewEncapsulation, effect } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { HomeService } from '../home.service'

enum ENTRYS_ID {
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
  public entryDataSustainability!: { text: string }
  currentLang!: string

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
  ) {
    this._effectActors()
  }

  ngOnInit(): void {
    this.currentLang = this._translate.defaultLang

    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
    this._onChangeLang()
  }

  private _effectActors() {
    effect(() => {
      this.entryDataConnecting = this._homeService.entryDataConnecting()
      this.entryDataSustainability = this._homeService.entryDataSustainability()
    })
  }


  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
      this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
      this.currentLang = res.lang
    })
  }

}
