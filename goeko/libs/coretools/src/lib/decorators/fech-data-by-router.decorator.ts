import { Router } from '@angular/router'

export function FechDataRouter(router: Router): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    if (typeof originalMethod !== 'function') {
      throw new Error(`@FechDataRouter can only be applied to methods, not: ${typeof originalMethod}`)
    }

    descriptor.value = function (...args: any[]): MethodDecorator {
      const result = originalMethod.apply(this, args)
      if (result && typeof result.subscribe === 'function') {
        result.subscribe(() =>
          router.navigate([''], {
            queryParams: { hash: window.crypto.randomUUID() },
          }),
        )
      }

      return result
    }

    return descriptor
  }
}
