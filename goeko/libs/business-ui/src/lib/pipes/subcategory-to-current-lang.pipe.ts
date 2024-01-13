import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ManageSubcategory, Translations } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'subcategoryToCurrentLang',
  pure: false,
  standalone: true,
})
export class SubcategoryToCurrentLangPipe implements PipeTransform {
  constructor(
    private _translations: TranslateService,
    private _cf: ChangeDetectorRef
  ) {}
  transform(subcategory: ManageSubcategory): any {
    const productCurrentLang: Translations | undefined =
      subcategory?.label?.translations.find(
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
