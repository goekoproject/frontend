import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'goeko-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="block w-max rounded-full bg-greenPastel px-3 py-1.5 text-sm font-semibold text-greenLime">
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    :host[size='xs'] {
      > span {
        @apply px-2 py-1 text-xs;
      }
    }
  `,
})
export class ChipComponent {}
