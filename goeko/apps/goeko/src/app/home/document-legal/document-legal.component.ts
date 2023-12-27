import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'goeko-document-legal',
  templateUrl: './document-legal.component.html',
  styleUrls: ['./document-legal.component.scss'],
})
export class DocumentLegalComponent implements OnInit {
  textLegal!: string;
  title!: string;
  private _entryId!: string;
  private _currentLang!: string;
  constructor(
    private contentFulService: ContentFulService,
    private _translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._entryId = this.route.snapshot.data['entryId'];
    this._currentLang = this._translate.defaultLang;
    this._getDocumentLegal();
    this._changeLang();
  }

  private _changeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._currentLang = res.lang;
      this._getDocumentLegal();
    });
  }

  private _getDocumentLegal() {
    this.contentFulService
      .getEntryIdByHTML(this._entryId)
      .subscribe((res: any) => {
        this.title = res.title;
        this.textLegal = res.text;
      });
  }
}
