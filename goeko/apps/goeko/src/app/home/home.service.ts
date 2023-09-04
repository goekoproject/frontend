import { Injectable } from '@angular/core';
import { ContentFulService } from '@goeko/store';
import { map } from 'rxjs';

enum LangOfLocalecontentFul {
	gb = 'en-US',
	fr = 'fr',
}
@Injectable({ providedIn: 'root' })
export class HomeService {
	constructor(private _contentFul: ContentFulService) {}

	getContent() {
		return this._contentFul.getContentEntry();
	}

	getEntry(entryId: string) {
		return this._contentFul.getEntryId(entryId);
	}

	getContentType(contentType: string, codeLang: string) {
		const currentLang = LangOfLocalecontentFul[codeLang as keyof typeof LangOfLocalecontentFul];
		return this._contentFul
			.getContentType(contentType, currentLang)
			.pipe(map((res) => res.items.map((item) => item.fields)));
	}
}
