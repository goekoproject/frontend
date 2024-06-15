import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lineBreak',
    standalone: true,
})

export class LineBreakPipe implements PipeTransform {
    transform(value: any): any {
        return value ? value.split('\n').join('<br />') : '-';
    }
}