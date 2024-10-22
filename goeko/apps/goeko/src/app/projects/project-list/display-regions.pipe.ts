import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'displayRegions',
  standalone: true,
})
export class DisplayRegionsPipe implements PipeTransform {
  transform(regions: { code: string; label: string }[]): string {
    const _regionsString = regions.map((region) => region.label).join(', ')
    return _regionsString ? `· ${_regionsString}` : ''
  }
}
