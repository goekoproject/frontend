import { ElementRef } from '@angular/core'

export function OnViewportChange() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const elementRef: ElementRef = args[0]
      if (!(elementRef instanceof ElementRef)) {
        throw new Error('First argument must be an ElementRef')
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            originalMethod.apply(this, args)
            observer.unobserve(elementRef.nativeElement) // Dejar de observar después de la primera llamada
          }
        })
      })

      observer.observe(elementRef.nativeElement)
    }

    return descriptor
  }
}
