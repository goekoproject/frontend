/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core'
import { Lang } from '@goeko/core'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-select-i18n',
  templateUrl: './select-i18n.component.html',
  styleUrls: ['./select-i18n.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, OverlayModule],
})
export class SelectI18nComponent implements OnInit {
  @Input() langs!: Lang[]
  @Input() defaultLang!: any

  @Output() onSelect: EventEmitter<any> = new EventEmitter()

  public isOpen = false
  public selectedLand = signal<string | null>(null)

  ngOnInit(): void {
    this.selectedLand.set(this.defaultLang.codeContentFul)
  }

  toggle() {
    this.isOpen = !this.isOpen
  }

  selectedLang(lang: Lang) {
    this.onSelect.emit(lang.code)
    this.selectedLand.set(lang.codeContentFul)
    this.isOpen = false
  }
}
