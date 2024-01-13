import { Pipe, PipeTransform } from '@angular/core';
import { ManageProduct } from '@goeko/store';

@Pipe({
  name: 'dataArraySummary',
})
export class DataArraySummaryPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.map((product: ManageProduct) => product.label).join(',  ');
  }
}
