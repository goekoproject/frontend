import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'goeko-myideas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myideas.component.html',
  styleUrl: './myideas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyideasComponent {
  public myIdeas = input.required<string>()
}
