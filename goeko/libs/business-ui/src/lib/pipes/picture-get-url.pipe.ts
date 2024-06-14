import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '@goeko/store';

@Pipe({
  name: 'pictureGetUrl',
  standalone: true,
})
export class PictureGetUrlPipe implements PipeTransform {
  transform(pictures: Picture[]): string[] {
    return pictures.map((picture) => picture.url);
  }
}
