import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-password-policy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [],
  templateUrl: './password-policy.component.html',
  styleUrls: ['./password-policy.component.scss'],
})
export class PasswordPolicyComponent {}
