import { CommonModule } from '@angular/common'
import { Component, input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'goeko-loading-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-process.component.html',
  styleUrl: './loading-process.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'fixed inset-0 z-50 flex items-center justify-center',
  },
})
export class LoadingProcessComponent {
  title = input.required<string>()
}
