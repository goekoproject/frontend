import { TranslateService } from '@ngx-translate/core' // Importamos el TranslateService
import { Observable, OperatorFunction } from 'rxjs'
import { switchMap, withLatestFrom } from 'rxjs/operators'

/**
 * Este operador escucha los cambios de idioma proporcionados por el TranslateService y re-lanza la llamada HTTP.
 * @param translateService Instancia del TranslateService inyectado desde Angular.
 */
export function executeOnLanguageChange<T>(translateService: TranslateService): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      withLatestFrom(translateService.onLangChange), // Combinamos la última emisión del cambio de idioma con la fuente
      switchMap(([value, langChangeEvent]) => {
        console.log(`Language changed to ${langChangeEvent.lang}, re-executing HTTP request`)
        return source$ // Re-ejecutamos la solicitud original
      }),
    )
}
