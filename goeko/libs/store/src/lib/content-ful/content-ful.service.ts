import { Inject, Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { from } from 'rxjs';
import { ContentFulConfig } from './config.interface';
import { CONTENT_FUL_CONFIG } from './content-ful.module';

@Injectable({ providedIn: 'root' })
export class ContentFulService {
  constructor(@Inject(CONTENT_FUL_CONFIG) public config: ContentFulConfig) {}

  private _client = contentful.createClient({
    space: this.config.contentFul.spaceId,
    accessToken: this.config.contentFul.token,
  });

  getContentEntry(entryId: string =  '15Ahom6oBNAbJP3Mth7y18') {
    return from(this._client.getEntry(entryId));
  }

  getEntryId(entryId: string) {
    return from(this._client.getEntry(entryId));
  }
}
