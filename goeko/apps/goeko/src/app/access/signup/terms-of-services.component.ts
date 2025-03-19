import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ContentFulModule, ContentFulService } from '@goeko/store'
import { DialogService, MdToHtmlPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'

const entryId = '67WiiwKgVdgTqphrs0hZLl'
@Component({
  selector: 'goeko-terms-of-services',
  standalone: true,
  imports: [CommonModule, MdToHtmlPipe, TranslateModule, ContentFulModule],
  templateUrl: './terms-of-services.component.html',
  styleUrl: './terms-of-services.component.scss',
})
export class TermsOfServicesComponent {
  public contentFulServices = inject(ContentFulService)
  private _dialogService = inject(DialogService)
  public termsOfServices$ = this.contentFulServices.getEntryId(entryId).pipe(map((content) => content.fields))

  closeDialog(isAccepted = false) {
    this._dialogService.close(isAccepted)
  }
}
