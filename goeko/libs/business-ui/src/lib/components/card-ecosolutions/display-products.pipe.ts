import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayProducts',
    standalone: true,
})

export class DisplayProductsPipe implements PipeTransform {
    transform(value: any): any {
            return value && Array.isArray(value) && value.length > 0 ? value.toString().replace(/,/g, ' · ') : '' ;
    }
}