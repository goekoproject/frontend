import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, QueryList, signal, viewChildren } from '@angular/core'
import { LANGS } from '@goeko/core'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'goeko-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="flex w-fit overflow-hidden rounded-lg border border-gray-200" role="radiogroup" aria-label="Language selection">
      @for (lang of langs(); track $index + '-lang'; let i = $index) {
        <button
          #langBtn
          type="button"
          role="radio"
          [attr.aria-checked]="selected() === lang.code"
          [attr.tabindex]="selected() === lang.code ? 0 : -1"
          [attr.aria-label]="lang.title"
          (click)="selectLang(lang.code)"
          (keydown)="onKeydown($event, i)"
          [class.bg-slate-800]="selected() === lang.code"
          [class.text-white]="selected() === lang.code"
          [class.font-semibold]="selected() === lang.code"
          class="flex items-center gap-2 px-4 py-2 transition focus:outline-none">
          @if (lang.title) {
            <span class="fi fi-{{ lang.iconFlag }}"></span>
            <span class="text-lg">{{ lang.title | translate }}</span>
          }
        </button>
      }
    </div>
  `,
  styles: [],
})
export class LanguageSwitcherComponent {
  private _translateService = inject(TranslateService)
  public langs = signal(LANGS)
  public langBtns = viewChildren<QueryList<ElementRef<HTMLButtonElement>>>('langBtn')
  public selected = signal<string | null>(this._translateService.currentLang)

  selectLang(code: string) {
    this.selected.set(code)
  }

  onKeydown(event: KeyboardEvent, index: number) {
    const langsArr = this.langs()
    let newIndex = index
    if (event.key === 'ArrowRight') {
      newIndex = (index + 1) % langsArr.length
      event.preventDefault()
    } else if (event.key === 'ArrowLeft') {
      newIndex = (index - 1 + langsArr.length) % langsArr.length
      event.preventDefault()
    }
    if (newIndex !== index) {
      const newLang = langsArr[newIndex]
      this.selectLang(newLang.code)
      // Mueve el foco al nuevo botón seleccionado
      this.langBtns().at(newIndex)
    }
  }
}
