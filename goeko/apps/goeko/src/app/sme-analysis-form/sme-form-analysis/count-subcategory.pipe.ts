import { Pipe, PipeTransform } from '@angular/core';
import { ClassificationCategory } from '@goeko/store';

@Pipe({
    name: 'countSubcategory',})

export class CountSubcategoryPipe implements PipeTransform {
    transform(value: ClassificationCategory): any {
        return Object.values(value).filter(el => Array.isArray(el)).length 
    }
}


@Pipe({
    name: 'countProduct'
})

export class CountProductPipe implements PipeTransform {
    transform(value: any): any {
        return Object.values(value).reduce((count: number, value) => {
            if (Array.isArray(value)) {
                return count + value.length;
              }
              return count + (value ? 1 : 0);
            }, 0)
      
        

    }
}
