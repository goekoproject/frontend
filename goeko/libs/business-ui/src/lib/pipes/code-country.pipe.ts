import { Pipe, PipeTransform, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

@Pipe({
    name: 'country',
    standalone: true,
    pure: false,
})

export class CodeCountryPipe implements PipeTransform {
    langSignal = signal(this._translateService.currentLang ||  this._translateService.defaultLang);

    constructor(private _translateService: TranslateService) {
        this._translateService.onLangChange.pipe(
          map(current => current.lang === 'gb'  ?  {...current, lang: 'en'}: current)
        ).subscribe(current => this.langSignal.set(current.lang))}
    transform(code: string | string[]): any {
        if(!code) {
            return code;
        }
        if(code instanceof  Array) {
            return code.map(codeLang => this._getNameCountryForLang(codeLang)).join(', ');
        }
        return this._getNameCountryForLang(code);
    }

    private _getNameCountryForLang(code : string) {
        return new Intl.DisplayNames([this.langSignal()], { type: 'region' }).of(code)
    }
}

