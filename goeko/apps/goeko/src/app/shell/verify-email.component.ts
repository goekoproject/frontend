import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-verify-email',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'goeko-verify-email'
  }
})
export class VerifyEmailComponent {}
