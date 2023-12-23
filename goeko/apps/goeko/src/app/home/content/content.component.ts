import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { InteractionService } from '../banner/scenes/interaction.service';
import { HomeService } from '../home.service';
import { CONTENT } from './content.contants';
import { TranslateService } from '@ngx-translate/core';
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

  private _body: any;

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
  constructor(
    private _homeService: HomeService,
    private _router: Router,
    private _translate: TranslateService,
    private _interactionService: InteractionService,
    private _viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.currentLang = this._translate.defaultLang;
    this._getContentActors();
    this._getActors();
    this._onClickSme();
    this._onClickCleanTeach();
    this._oBank();
  }

  private _onClickSme() {
    this._interactionService.onSMEClick.subscribe((res) => {
      if (res) {
        this._viewportScroller.scrollToAnchor('sme');
      }
    });
  }

  private _onClickCleanTeach() {
    this._interactionService.onCleanTeachClick.subscribe((res) => {
      this._viewportScroller.scrollToAnchor('cleantech');
    });
  }

  private _oBank() {
    this._interactionService.onBankClick.subscribe((res) => {
      this._viewportScroller.scrollToAnchor('bank');
    });
  }

  private _getActors() {
    this._translate.onLangChange.subscribe((res) => {
      this._getContentActors();
      this.currentLang = res.lang;
    });
  }

  private _getContentActors() {
    this._homeService.getContentType('actores').subscribe((res) => {
      this.articles = res.map((actor: any) => ({
        ...actor,
        benefits: this._buildDataLandingPage(actor.benefits),
      }));
    });
  }
}
