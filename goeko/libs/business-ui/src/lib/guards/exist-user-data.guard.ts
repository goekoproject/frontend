import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogMessageService } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class VillainsComponent implements CanComponentDeactivate { ...
//
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const existUserDataGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate
) => {
    const dialogMessageService = inject(DialogMessageService);
    const translateService = inject(TranslateService);

        if (component.canDeactivate()) {
            return true;
        } else {
            dialogMessageService.open( {
                title: translateService.instant('DIALOG.messaggeProfileUncompletedTitle'),
                body: translateService.instant('DIALOG.messaggeProfileUncompletedBody'),
                buttonPrimary: translateService.instant('accept'),
              })

            return false;
    }
}

