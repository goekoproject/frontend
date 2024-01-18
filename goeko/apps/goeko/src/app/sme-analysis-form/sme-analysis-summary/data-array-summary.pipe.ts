import { Pipe, PipeTransform } from '@angular/core';
import { ManageProduct } from '@goeko/store';

@Pipe({
  name: 'dataArraySummary',
})
export class DataArraySummaryPipe implements PipeTransform {
  transform(value: any, subcategoryOfProduct: any[] | undefined): any {
    if (typeof value === 'object') {
      return value
        .map((product: any) =>
          product.label
            ? product.label
            : this._codeProductToObjectProduct(product, subcategoryOfProduct)
        )
        .join(' , ');
    }
  }

  private _codeProductToObjectProduct(
    codeProduct: string,
    subcategoryOfProduct: ManageProduct[] | undefined
  ): any {
    return subcategoryOfProduct?.find((product) => product.code === codeProduct)
      ?.label;
  }
}
