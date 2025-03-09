import { Component, computed, inject, input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { SelectCertificateService } from './select-certificate.service'

@Component({
  selector: 'goeko-info-certificate',
  standalone: true,
  imports: [TranslateModule],
  template: `
    @defer (when fileUrl()) {
      <div class="w-52 cursor-pointer rounded-lg bg-white p-1 drop-shadow-md hover:drop-shadow-lg" (click)="viewFile()">
        <div class="flex w-full items-center justify-end p-1 text-2xl text-primary-default transition-colors hover:text-primary-blueDark">
          <i class="ti ti-download"></i>
          <p class="text-xs font-semibold">{{ 'download' | translate }}</p>
        </div>
        <!-- title -->
        <div class="flex items-center justify-center gap-2 rounded-md bg-blueLightPastel p-2">
          <p class="font-semibold">{{ fileType() }}</p>
          <i class="ti ti-file-type-pdf text-2xl"></i>
        </div>
      </div>
    }
  `,
})
export class InfoCertificateComponent {
  private _selectCertificateService = inject(SelectCertificateService)
  fileUrl = input.required<string>()
  fileType = input<string>('Technical sheet')
  fileName = computed(() => {
    const url = this.fileUrl()
    return url.substring(url.lastIndexOf('/') + 1)
  })

  viewFile(): void {
    this._selectCertificateService.viewFileOnBrowser(this.fileUrl())
  }
}
