import { Directive, HostListener, inject, input, output, TemplateRef } from '@angular/core'

@Directive({
  selector: '[goekoOperation]',
  standalone: true,
})
export class OperationDirective {
  public operationClick = output<unknown>()
  public template = inject(TemplateRef)
  public dataOperation = input<unknown>(undefined, { alias: 'goekoOperation' })
  @HostListener('click')
  onClick() {
    this.operationClick.emit(this.dataOperation())
  }
}
