import { inject } from "@angular/core";
import { CanDeactivateFn } from "@angular/router";
import { DialogMessageService } from "@goeko/ui";
import { TranslateService } from "@ngx-translate/core";
import { of, switchMap } from "rxjs";
import { CanAnalysisDeactivate } from "./can-component-deactivate.interface";

export const unSavedChangesGuard : CanDeactivateFn<CanAnalysisDeactivate> = (
    component: CanAnalysisDeactivate
) => {
    const  dialogMessageService = inject(DialogMessageService);
    const translateService = inject(TranslateService);
   if(component?.canDeactivate()) {
     return true
   } else {
    return dialogMessageService.open( {
        title: translateService.instant('DIALOG.saveMessageGeneric'),
        body: translateService.instant('DIALOG.messaggeProfileUncompletedBody'),
        buttonPrimary: translateService.instant('save'),
        buttonSecondary: translateService.instant('notSave'),
      }).afterClosed().pipe(switchMap( saveForm => {
        if(saveForm) {
          return component?.saveAnalysis ? component.saveAnalysis() : of(true);
        } else {
          return of(true)
        }
      }))

    }
}
