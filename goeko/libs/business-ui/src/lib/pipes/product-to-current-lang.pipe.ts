import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ManageProduct, Translations } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

@Pipe({
  name: 'productToCurrentLang',
  standalone: true,
  pure: false,
})
export class ProductToCurrentLangPipe implements PipeTransform {
  constructor(
    private _translations: TranslateService,
    private _cf: ChangeDetectorRef
  ) {}
  transform(product: ManageProduct, ...args: any[]): any {
    const productCurrentLang: Translations | undefined =
      product?.label?.translations.find(
        (translation: Translations) =>
          translation.lang === this._getCurrentLang()
      );
    return productCurrentLang?.label;
  }

  private _getCurrentLang() {
    return this._translations.currentLang
      ? this._translations.currentLang
      : this._translations.defaultLang;
  }
}
