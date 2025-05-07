import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { ButtonModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-info-action-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslatePipe],
  templateUrl: './info-action-card.component.html',
  styleUrl: './info-action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoActionCardComponent {
  title = input<string>('')
  subtitle = input<string>('')
  textButton = input<string>('')
  actionClick = output<void>()

  onAction() {
    this.actionClick.emit()
  }
}
