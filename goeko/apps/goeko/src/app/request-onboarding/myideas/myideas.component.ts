import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'goeko-myideas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myideas.component.html',
  styleUrl: './myideas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyideasComponent {}
