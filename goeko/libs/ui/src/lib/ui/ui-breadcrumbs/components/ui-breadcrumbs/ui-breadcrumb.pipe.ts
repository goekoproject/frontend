import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'format',
})
export class BreadCrumbsFormatPipe implements PipeTransform {
	transform(value: any): string {
		return value;
	}
}
