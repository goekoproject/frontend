import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ContentFulService } from '@goeko/store'
import { DialogService, MdToHtmlPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'

@Component({
  selector: 'goeko-terms-of-services',
  standalone: true,
  imports: [CommonModule, MdToHtmlPipe, TranslateModule],
  templateUrl: './terms-of-services.component.html',
  styleUrl: './terms-of-services.component.scss',
})
export class TermsOfServicesComponent {
  public contentFulServices = inject(ContentFulService)
  private _dialogService = inject(DialogService)
  public termsOfServices$ = this.contentFulServices.getEntryId('67WiiwKgVdgTqphrs0hZLl').pipe(map((content) => content.fields))

  closeDialog(isAccepted: boolean = false) {
    this._dialogService.close(isAccepted)
  }
}