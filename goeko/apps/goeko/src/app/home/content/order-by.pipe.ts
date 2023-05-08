import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
	transform(value: any[], orderBy: string, direction: 'asc' | 'desc' = 'asc'): any[] | undefined {
		if (!value || !orderBy) {
			return value;
		}

		const sorted = value.sort((a, b) => {
			if (a[orderBy] < b[orderBy]) {
				return direction === 'asc' ? -1 : 1;
			} else if (a[orderBy] > b[orderBy]) {
				return direction === 'asc' ? 1 : -1;
			}
			return 0;
		});

		return sorted;
	}
}
