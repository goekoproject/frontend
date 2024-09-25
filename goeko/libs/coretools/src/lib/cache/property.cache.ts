export function CacheProperty(cacheKey: string) {
  return function (target: any, propertyKey: string) {
    const privatePropertyKey = `_${propertyKey}`

    Object.defineProperty(target, propertyKey, {
      get: function () {
        const cachedValue = localStorage.getItem(cacheKey)
        if (cachedValue !== null) {
          return JSON.parse(cachedValue)
        }
        return this[privatePropertyKey]
      },
      set: function (value: any) {
        this[privatePropertyKey] = value
        localStorage.setItem(cacheKey, JSON.stringify(value))
      },
      enumerable: true,
      configurable: true,
    })
  }
}

import { signal, WritableSignal } from '@angular/core'

export function CacheSignal(cacheKey: string) {
  return function (target: any, propertyKey: string) {
    const privatePropertyKey = `_${propertyKey}`

    Object.defineProperty(target, propertyKey, {
      get: function () {
        const cachedValue = localStorage.getItem(cacheKey)
        if (cachedValue !== null) {
          return signal(JSON.parse(cachedValue))
        }
        return this[privatePropertyKey]
      },
      set: function (value: WritableSignal<any>) {
        this[privatePropertyKey] = value()
        value.set(value())
        localStorage.setItem(cacheKey, JSON.stringify(value()))
      },
      enumerable: true,
      configurable: true,
    })
  }
}
