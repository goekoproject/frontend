import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
    name: 'goDateFormat'
})

export class GoDateFormatPipe implements PipeTransform {
    
    transform(value: any, ...args: any[]): any {
        return moment.utc(value).local()
    }
}