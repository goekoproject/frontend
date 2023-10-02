import { Inject, Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { from } from 'rxjs';
import { ContentFulConfig } from './config.interface';
import { CONTENT_FUL_CONFIG } from './content-ful.module';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
export enum LangOfLocalecontentFul {
	gb = 'en-US',
	fr = 'fr',
}
@Injectable({ providedIn: 'root' })
export class ContentFulService {
	constructor(@Inject(CONTENT_FUL_CONFIG) public config: ContentFulConfig) {}

	private _client = contentful.createClient({
		space: this.config.contentFul.spaceId,
		accessToken: this.config.contentFul.token,
	});

	getContentEntry(entryId: string = '15Ahom6oBNAbJP3Mth7y18') {
		return from(this._client.getEntry(entryId));
	}

	getEntryId(entryId: string) {
		return from(this._client.getEntry(entryId));
	}
	getEntryIdByHTML(entryId: string, codeLang: string) {
		const currentLang = LangOfLocalecontentFul[codeLang as keyof typeof LangOfLocalecontentFul];
		return from(this._getBodyLikeHtml(entryId, currentLang));
	}
	private async _getBodyLikeHtml(entryId: string, codeLang: string) {
		return this._client.getEntry(entryId, { locale: codeLang }).then((entry: any) => {
			const newBody = documentToHtmlString(entry.fields.text);
			const documentlegal = {
				...entry.fields,
				text: newBody,
			};

			return documentlegal;
		});
	}

	getContentType(contentType: string, currentLang?: string) {
		return from(this._client.getEntries({ content_type: 'actores', locale: currentLang }));
	}
}
