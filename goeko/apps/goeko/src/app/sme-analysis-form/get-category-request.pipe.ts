import { Pipe, PipeTransform } from '@angular/core';
import { Classifications } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'categoryRequest',
    pure: false,
})

export class CategoryRequestPipe implements PipeTransform {
    constructor(private _translateService: TranslateService){}
    transform(classifications: Classifications[], ...args: any[]): any {
        if(classifications) {
            return [...new Set(classifications.map(c => c.mainCategory))].map(mainCategory => this._translateService.instant(`CATEGORIES.${mainCategory}`));
        }
    }
}