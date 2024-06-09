import { inject, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
export enum CodeLangToCode {
    gb = 'en-US',
    fr = 'fr',
  }
export function currentCodeLang()  {
    return () => {
        const codeLang =
        inject(TranslateService).currentLang || inject(TranslateService).currentLang;
    const currentLang =
    CodeLangToCode[codeLang as keyof typeof CodeLangToCode];
    return signal(currentLang);
    }
}