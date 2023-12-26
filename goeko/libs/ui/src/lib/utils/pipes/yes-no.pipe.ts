import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'yesNo',
  pure: true,
})
export class YesNoPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: boolean): string {
    return value ? this.translate.instant('yes') : this.translate.instant('no');
  }
}
