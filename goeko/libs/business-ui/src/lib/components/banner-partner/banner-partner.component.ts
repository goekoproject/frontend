import { CommonModule } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-banner-partner',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './banner-partner.component.html',
  styleUrl: './banner-partner.component.scss',
})
export class BannerPartnerComponent {
  id = input.required<string>()
  title = input.required<string>()
  description = input.required<string>()
  image = input<string>()

  onSelectPartner = output<string>()

  propagatePartner() {
    this.onSelectPartner.emit(this.id())
  }
}
