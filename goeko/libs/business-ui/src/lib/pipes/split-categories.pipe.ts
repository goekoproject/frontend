import { Pipe, PipeTransform } from "@angular/core";
import { Classifications } from "@goeko/store";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'splitCategories',
  pure: false,
  standalone: true,
})

export class SplitCategoriesPipe implements PipeTransform {
  constructor(private _translateService: TranslateService){}
  transform(classifications: Classifications[], ...args: any[]): any {
      if(classifications) {
          return [...new Set(classifications.map(c => c.mainCategory))].map(mainCategory => this._translateService.instant(`CATEGORIES.${mainCategory}`));
      }
  }
}
