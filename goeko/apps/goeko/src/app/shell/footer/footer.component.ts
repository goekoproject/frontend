import { Component, ViewEncapsulation } from '@angular/core'
import { DialogService } from '@goeko/ui';
import { RequestDemoDialogComponent } from '../../home/request-demo-dialog/request-demo-dialog.component';

@Component({
  selector: 'goeko-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'footer-wrapper',
  },
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();

  constructor(
    private _dialogService: DialogService,
  ) {
  }


  openRequestDemoDialog() {
    this._dialogService
      .open(RequestDemoDialogComponent)
      .afterClosed()
      .subscribe((isAccepted) => {
      })
  }

}
