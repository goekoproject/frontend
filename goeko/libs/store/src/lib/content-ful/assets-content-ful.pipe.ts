import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'extractAsset', standalone: true })
export class AssetsContentFulPipe implements PipeTransform {
  transform(value: any): any {
    return value?.fields?.file?.url
  }
}
