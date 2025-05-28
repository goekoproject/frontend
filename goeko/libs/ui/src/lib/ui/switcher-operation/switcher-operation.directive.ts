import { Directive, HostListener, inject, output, TemplateRef } from '@angular/core'

@Directive({
  selector: '[goekoOperation]',
  standalone: true,
})
export class OperationDirective {
  operationClick = output<void>()
  public templateRef = inject(TemplateRef)
  @HostListener('click')
  onClick() {
    this.operationClick.emit()
  }
}
