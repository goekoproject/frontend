import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HomeService } from '../home.service';
import { CONTENT } from './content.contants';

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
})
export class ContentComponent implements OnInit {
  @ViewChildren('content') articlesRef!: QueryList<ElementRef>;
  /* article: any; */
  articles!: Array<any>;
  otherContent = false;
  badStuffIcons = ['bolt', 'compost', 'unknown_document'];
  actorsImg = ['sme.jpg', 'cleantech.jpg', 'bank.jpg'];

  public content = CONTENT;

  currentLang!: string;
  private _searchEntry$ = (entryId: any) => {
    console.log(entryId);
    return this._homeService
      .getEntry(entryId)
      .pipe(map((benefits: any) => this._buildBenefis(benefits)));
  };

  private _buildBenefis = (benefit: any) => {
    return {
      ...benefit.fields,
      media: benefit.fields.media.fields.file,
    };
  };

  private _buildDataLandingPage = (data?: any): Array<any> => {
    return data.content
      .filter((b: any) => b.data.target?.fields)
      .map((benefits: any) => benefits.data.target.fields);
  };
  link: any;

  public actors!: any;
  public entryDataConnecting!: { text: string };
  public entryDataSustainability!: { text: string };

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
    private _viewportScroller: ViewportScroller
  ) {
    this._effectActors();
  }

  ngOnInit(): void {
    this.currentLang = this._translate.defaultLang;

    this._getContentActors();
    this._getContentDataActors();
    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY);
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING);
    this._onChangeLang();

  }

  private _effectActors() {
    effect(() => {
      this.actors = this._homeService.dataContentTypeSignal();
      this.entryDataConnecting = this._homeService.entryDataConnecting();
      this.entryDataSustainability =
        this._homeService.entryDataSustainability();
    });
  }
  navigateToActors(actor: string) {
    this._viewportScroller.scrollToAnchor(actor);
  }

  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._getContentDataActors();
      this._getContentActors();
      this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY);
      this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING);
      this.currentLang = res.lang;
    });
  }

  private _getContentDataActors() {
    this._homeService
      .getContentType(CONTENT_TYPE_DATA.ACTORS)
      .subscribe((res) => {
        this.articles = res.map((actor: any) => ({
          ...actor,
          benefits: this._buildDataLandingPage(actor.benefits),
          image: actor.image?.fields?.file?.url,
        }));
      });
  }

  private _getContentActors() {
    this._homeService.getContentTypeSignal(CONTENT_TYPE_DATA.LANDING_PAGE);
  }

  goTologin() {
    this._homeService.goTologin();

  }
}
