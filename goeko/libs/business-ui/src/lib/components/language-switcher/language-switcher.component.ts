import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, input, output, QueryList, signal, viewChildren } from '@angular/core'
import { Lang, LANGS } from '@goeko/core'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'goeko-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="flex w-fit overflow-hidden rounded-lg border border-gray-200 text-xs" role="radiogroup" aria-label="Language selection">
      @for (lang of orderedLangs(); track $index + '-lang'; let i = $index; let first = $first) {
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
            @if (first) {
              <span>{{ 'original' | translate }}</span>
            } @else {
              <span>{{ lang.title | translate }}</span>
            }
          }
        </button>
      }
    </div>
  `,
  styles: [],
})
export class LanguageSwitcherComponent {
  private _translateService = inject(TranslateService)
  public selectedChange = output<string>()
  public langs = input.required<Lang[]>()
  public langBtns = viewChildren<QueryList<ElementRef<HTMLButtonElement>>>('langBtn')
  public selected = signal<string | null>(this._translateService.currentLang)

  public orderedLangs = computed(() => {
    const current = this._translateService.currentLang
    return [...this.langs()].sort((a) => (a.code === current ? -1 : 1))
  })
  selectLang(code: string) {
    this.selected.set(code)
    this.selectedChange.emit(this.selected() as string)
  }

  onKeydown(event: KeyboardEvent, index: number) {
    const langsArr = this.orderedLangs()
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
