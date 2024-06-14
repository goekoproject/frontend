import { Pipe, PipeTransform } from '@angular/core';

type OrderType = 'asc' | 'desc';
@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], order: OrderType = 'asc', prop?: string): any[] {
    if (!Array.isArray(value)) {
      return value;
    }

    const isAscending = order === 'asc';
    return prop ? this.sortByProperty(value, prop, isAscending) : this.sortByValue(value, isAscending);
  }

  private sortByProperty(array: any[], prop: string, isAscending: boolean): any[] {
    return array.sort((a, b) => {
      const valueA = this.getPropertyValue(a, prop);
      const valueB = this.getPropertyValue(b, prop);
      return this.compareValues(valueA, valueB, isAscending);
    });
  }

  private sortByValue(array: any[], isAscending: boolean): any[] {
    return array.sort((a, b) => this.compareValues(a, b, isAscending));
  }

  private getPropertyValue(obj: any, prop: string): any {
    return obj[prop];
  }

  private compareValues(a: any, b: any, isAscending: boolean): number {
    if (typeof a === 'number' && typeof b === 'number') {
      return isAscending ? a - b : b - a;
    } else {
      const comparison = a.toString().localeCompare(b.toString());
      return isAscending ? comparison : -comparison;
    }
  }
}
