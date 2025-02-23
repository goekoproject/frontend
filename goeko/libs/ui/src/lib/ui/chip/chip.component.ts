import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'goeko-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="rounded-full bg-greenPastel px-3 py-1.5 text-sm font-semibold text-greenLime">
      <ng-content></ng-content>
    </span>
  `,
})
export class ChipComponent {}
