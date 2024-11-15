import { inject } from '@angular/core'
import { DialogMessageService } from '@goeko/ui'
import { Observable, of, switchMap } from 'rxjs'

export const canDeactivateForm = (
  callback: () => Observable<any>,
  dataDialog = {
    title: 'DIALOG.saveMessageGeneric',
    buttonPrimary: 'accept',
    buttonSecondary: 'notSave',
  },
) => {
  const dialogResponse$ = inject(DialogMessageService).open(dataDialog)
  return dialogResponse$.afterClosed().pipe(
    switchMap((saveForm) => {
      if (saveForm) {
        return callback()
      }
      return of(true)
    }),
  )
}
