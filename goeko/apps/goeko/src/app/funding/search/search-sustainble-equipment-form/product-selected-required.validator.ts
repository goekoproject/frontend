import { AbstractControl, ValidationErrors } from '@angular/forms'

export function productSelectedRequiredValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as AbstractControl
    const vehiclesProducts = form.get('vehicles.products')?.value
    const machinesProducts = form.get('machines.products')?.value
    if (!vehiclesProducts && !machinesProducts) {
      return {
        productRequired: true,
      }
    }
    return null
  }
}
