import { Directive, ElementRef, HostListener, inject, output } from '@angular/core'

@Directive({
  selector: '[goekoOperation]',
})
export class OperationDirective {
  operationClick = output<void>()
  public elementRef = inject(ElementRef)
  @HostListener('click')
  onClick() {
    this.operationClick.emit()
  }
}
