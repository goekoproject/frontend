import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core'
import { OperationDirective } from './switcher-operation.directive'

@Component({
  selector: 'goeko-switcher-operation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switcher-operation.component.html',
  styleUrl: './switcher-operation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherOperationComponent {
  operations = contentChildren(OperationDirective)
}
