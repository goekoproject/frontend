import { Pipe, PipeTransform, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
@Pipe({
    name: 'goDateFormat',
    standalone: true,
    pure: false,
})

export class GoDateFormatPipe implements PipeTransform {
    langSignal = signal(this._translateService.currentLang ||  this._translateService.defaultLang);

    constructor(private _translateService: TranslateService) {}
    transform(value: string): any {
        if(value) {
            return moment.utc(value).local().locale(this.langSignal()).format('LLL')
        }
        return;
        
    }
}