import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { ContentFulService } from '../content-ful/content-ful.service';

@Component({
  selector: 'goeko-base-contentful',
  template: ` <p>base content ful works!</p> `,
})
export class BaseDataContentFulComponent implements OnDestroy {
  public entryId!: string;
  public currentLang!: string;

  get content$(): Observable<any> {
    return this._content$.asObservable();
  }

  private _content$ = new Subject();

  private _changeContent$ = new Subject();

  constructor(
    private _contentFulService: ContentFulService,
    private _translate: TranslateService,
    private _route: ActivatedRoute
  ) {
    this.entryId = this._route.snapshot.data['entryId'];
    this.currentLang = this._translate.defaultLang;
    this._changedLang();
    this._getContent();
    this._changeContent$.next(true);
  }

  ngOnDestroy(): void {
    this._changeContent$.next(null);
    this._changeContent$.complete();
  }

  public _getContent() {
    this._changeContent$.subscribe((content) => {
      if (content) {
        this._contentFulService
          .getEntryIdByHTML(this.entryId, this.currentLang)
          .subscribe((res) => this._content$.next(res));
      }
    });
  }

  private _changedLang() {
    this._translate.onLangChange.subscribe((res) => {
      this.currentLang = res.lang;
      this._changeContent$.next(true);
    });
  }
}
