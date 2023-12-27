import { Injectable, signal } from '@angular/core';
import { ContentFulService, LangOfLocalecontentFul } from '@goeko/store';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  dataContentTypeSignal = signal<unknown | null>(null);
  entryDataConnecting = signal<any | null>(null);
  entryDataSustainability = signal<any | null>(null);

  constructor(private _contentFul: ContentFulService) {}

  getContent() {
    return this._contentFul.getContentEntry();
  }

  getEntry(entryId: string) {
    return this._contentFul.getEntryId(entryId);
  }

  getSloganConnecting(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.entryDataConnecting.set(entryData);
        }
      });
  }
  getSloganSustainability(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.entryDataSustainability.set(entryData);
        }
      });
  }
  getContentType(contentType: string) {
    return this._contentFul
      .getContentType(contentType)
      .pipe(map((res) => res.items.map((item) => item.fields)));
  }

  getContentTypeSignal(contentType: string) {
    return this._contentFul
      .getContentType(contentType)
      .pipe(map((res) => res.items.map((item) => item.fields)))
      .subscribe((dataContentTypeSignal) => {
        if (dataContentTypeSignal) {
          this.dataContentTypeSignal.set(dataContentTypeSignal);
        }
      });
  }
}
