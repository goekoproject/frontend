import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'productTitle',
})
export class ProductTitlePipe implements PipeTransform {
	constructor(private translateService: TranslateService) {}
	transform(products: any): any {
		return products
			.split(',')
			.map((product: any) => this.translateService.instant(product))
			.toString();
	}
}
