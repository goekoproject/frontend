import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, output } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-request-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './card-request.component.html',
  styleUrl: './card-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex items-center bg-white  shadow p-8 border border-gray-200 rounded-xl shadow-md',
  },
})
export class CardRequestComponent {
  viewMoreChange = output<void>()

  onViewMore() {
    this.viewMoreChange.emit()
  }
}
