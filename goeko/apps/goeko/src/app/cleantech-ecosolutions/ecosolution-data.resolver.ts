import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { Ecosolutions } from '@goeko/store'
import { catchError } from 'rxjs'
import { EcosolutionsManagmentService } from './ecosolutions-form/ecosolutions-managment.service'

export const ecosolutionResolver: ResolveFn<Ecosolutions> = (route: ActivatedRouteSnapshot) => {
  const ecosolutionManagmentService = inject(EcosolutionsManagmentService)
  const idEcosolution = route.paramMap.get('id')

  if (!idEcosolution) {
    throw new Error('El parámetro ID de ecosolution es requerido')
  }

  return ecosolutionManagmentService.getEcosolutionById(idEcosolution).pipe(
    catchError((error) => {
      console.error('Error al cargar la ecosolution:', error)
      throw error
    }),
  )
}
