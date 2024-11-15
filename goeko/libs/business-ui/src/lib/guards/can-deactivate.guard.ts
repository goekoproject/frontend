import { CanDeactivateFn } from '@angular/router'
import { CanComponentDeactivate } from './can-component-deactivate.interface'

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
  return component.canDeactivate()
}
