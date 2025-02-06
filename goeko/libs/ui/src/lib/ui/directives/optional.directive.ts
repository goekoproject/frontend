import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslateService } from '@ngx-translate/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[go-optional]',
  standalone: true,
})
export class OptionalDirective {
  private _translateService = inject(TranslateService)
  private _el = inject(ElementRef)
  private _renderer = inject(Renderer2)

  isOptional = input<boolean>(false, {
    alias: 'go-optional',
  })

  optionalText = toSignal(this._translateService.stream('optional'))

  constructor() {
    effect(() => {
      if (this.isOptional()) {
        this._renderer.setAttribute(this._el.nativeElement, 'data-after-label', this.optionalText())
      }
    })
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[go-optional-label]',
  standalone: true,
})
export class OptionalLabelDirective {
  private _translateService = inject(TranslateService)
  private _el = inject(ElementRef)
  private _renderer = inject(Renderer2)

  optionalText = toSignal(this._translateService.stream('optional'))

  constructor() {
    effect(() => {
      this._renderer.addClass(this._el.nativeElement, 'label-form')
      this._renderer.setAttribute(this._el.nativeElement, 'data-after-label', this.optionalText())
    })
  }
}
