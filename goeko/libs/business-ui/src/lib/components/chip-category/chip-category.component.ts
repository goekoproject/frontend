import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'goeko-chip-category',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'rounded-full bg-greenPastel px-3 py-1.5 text-sm font-semibold text-greenLime h-fit w-fit',
  },
})
export class ChipCategoryComponent {}
