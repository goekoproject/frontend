import { Component, ViewEncapsulation } from '@angular/core'

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

}
