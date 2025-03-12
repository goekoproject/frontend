import { Component, Input } from '@angular/core'

@Component({
  selector: 'go-percentage-card',
  templateUrl: './percentage-card.component.html',
  styleUrls: ['./percentage-card.component.scss'],
})
export class PercentageCardComponent {
  @Input() percentage = 15
  @Input() label = ''
  @Input() isUpto = false
}
