import { Injectable } from '@angular/core';
import { ContentFulService } from '@goeko/store';

@Injectable({providedIn: 'root'})
export class HomeService {
    constructor(private _contentFul: ContentFulService) { }

    getContent() {
        return this._contentFul.getContentEntry();
    }

    getEntry(entryId: string) {
        return this._contentFul.getEntryId(entryId);
    }
    
}