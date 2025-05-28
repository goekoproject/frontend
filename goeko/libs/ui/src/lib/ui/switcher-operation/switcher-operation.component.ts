import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, contentChildren, signal } from '@angular/core'
import { OperationDirective } from './switcher-operation.directive'

@Component({
  selector: 'goeko-switcher-operation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switcher-operation.component.html',
  styleUrl: './switcher-operation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex',
  },
})
export class SwitcherOperationComponent {
  operations = contentChildren(OperationDirective)
  selectedOperation = signal<number>(0)

  selectOperation(index: number) {
    this.selectedOperation.set(index)
  }
}
