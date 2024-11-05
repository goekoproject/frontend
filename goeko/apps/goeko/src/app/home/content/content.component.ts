import { CommonModule, ViewportScroller } from '@angular/common'
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { HomeService } from '../home.service'
import { CONTENT } from './content.contants'
import { OrderByPipe } from './order-by.pipe'

enum CONTENT_TYPE_DATA {
  ACTORS = 'actores',
  LANDING_PAGE = 'landingPage',
}
enum ENTRYS_ID {
  CONNECTING = '5K722xUKUczzRHt5COUgLp',
  SUSTAINABILITY = '2hwIsU3aiyyd2RhzFIgvw0',
}
@Component({
  selector: 'go-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [TranslateModule, CommonModule, OrderByPipe],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex flex-col items-center gap-[10rem]',
  },
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChildren('content') articlesRef!: QueryList<ElementRef>
  @ViewChild('articleEl', { static: true }) article!: ElementRef

  articles!: Array<any>

  public content = CONTENT

  currentLang!: string

  private _buildDataLandingPage = (data?: any): Array<any> => {
    return data.content.filter((b: any) => b.data.target?.fields).map((benefits: any) => benefits.data.target.fields)
  }

  public actors = this._homeService.dataContentTypeSignal
  public entryDataConnecting = this._homeService.entryDataConnecting
  public entryDataSustainability = this._homeService.entryDataSustainability

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
    private _viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.currentLang = this._translate.defaultLang

    this._getContentActors()
    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
    this._onChangeLang()
  }

  applyStyles(value:string): string {
    const newValue = value.replaceAll('[','<span class="fill-colour">').replaceAll(']','</span>');
    return  newValue;
  }

  ngAfterViewInit(): void {
    this._getContentDataActors()
  }

  navigateToActors(actor: string) {
    this._viewportScroller.scrollToAnchor(actor)
  }

  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._getContentDataActors()
      this._getContentActors()
      this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
      this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
      this.currentLang = res.lang
    })
  }

  private _getContentDataActors() {
    this._homeService.getContentType(CONTENT_TYPE_DATA.ACTORS).subscribe((res) => {
      this.articles = res.map((actor: any) => ({
        ...actor,
        benefits: this._buildDataLandingPage(actor.benefits),
        image: actor.image?.fields?.file?.url,
      }))
    })
  }

  private _getContentActors() {
    this._homeService.getContentTypeSignal(CONTENT_TYPE_DATA.LANDING_PAGE)
  }

  goToLogin() {
    this._homeService.goTologin()
  }
}
