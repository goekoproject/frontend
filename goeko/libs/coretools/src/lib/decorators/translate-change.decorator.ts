import { inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

export function OnLangChange(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    if (typeof originalMethod !== 'function') {
      throw new Error(`@OnLangChange can only be applied to methods, not: ${typeof originalMethod}`)
    }

    descriptor.value = function (...args: any[]) {
      const instance = this as typeof target
      inject(TranslateService).onLangChange.subscribe((res) => {
        instance.lang.set(res.lang)
        originalMethod.apply(instance, args)
      })
      return originalMethod.apply(instance, args)
    }

    return descriptor
  }
}
