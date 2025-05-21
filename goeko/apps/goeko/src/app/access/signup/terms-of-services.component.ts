import { CommonModule } from '@angular/common'
import { Component, inject, ViewEncapsulation } from '@angular/core'
import { SafePipe } from '@goeko/coretools'
import { ContentFulModule, ContentFulService } from '@goeko/store'
import { DialogService } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

const entryId = '67WiiwKgVdgTqphrs0hZLl'
@Component({
  selector: 'goeko-terms-of-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SafePipe, ContentFulModule],
  templateUrl: './terms-of-services.component.html',
  styleUrl: './terms-of-services.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'terms-of-services',
  },
})
export class TermsOfServicesComponent {
  public contentFulServices = inject(ContentFulService)
  private _dialogService = inject(DialogService)
  public termsOfServices$ = this.contentFulServices.getEntryIdByHTML(entryId)

  closeDialog(isAccepted = false) {
    this._dialogService.close(isAccepted)
  }
}
