import { Pipe, PipeTransform } from '@angular/core';

export class DataOptions {
	value: string;
	title: string;
	constructor(data: any) {
		this.value = data;
		this.title = data;
	}
}

@Pipe({
	name: 'transform',
})
export class ToStringToObjectPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		if (value && value instanceof Array) {
			return value.map((data: any) => {
				return new DataOptions(data);
			});
		}
	}
}
