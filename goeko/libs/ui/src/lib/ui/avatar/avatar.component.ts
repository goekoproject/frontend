import { CommonModule } from '@angular/common'
import { Component, computed, input } from '@angular/core'

@Component({
  selector: 'goeko-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mr-4 grid place-items-center">
      @if (type() === 'img') {
        <img [src]="src()" [alt]="'avatar'" class="relative inline-block h-12 w-12 !rounded-full object-cover object-center" />
      } @else {
        <span
          class="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-main text-xl font-normal text-white">
          {{ initial() }}
        </span>
      }
    </div>
  `,
})
export class AvatarComponent {
  type = input<'img' | 'initials'>('initials')
  src = input.required<string>()

  initial = computed(() => this._getInitials())

  private _getInitials() {
    return this.type() !== 'img'
      ? this.src()
          .split(' ')
          .map((part) => part.charAt(0))
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : ''
  }
}
