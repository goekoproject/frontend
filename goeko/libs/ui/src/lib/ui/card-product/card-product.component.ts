import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-card-product',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  @Input() title!: string
  @Input() description!: string
  @Input() image!: string
  @Input() category!: string
  @Input() classNameCategoy!: string
  @Input() isFavorite!: boolean

  @Output() changeFavorite = new EventEmitter<boolean>()
  @Output() changeShowMore = new EventEmitter<void>()
  doFavorite() {
    this.isFavorite = !this.isFavorite
    this.changeFavorite.emit(this.isFavorite)
  }

  showMore() {
    this.changeShowMore.emit()
  }
}
