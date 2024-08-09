import { Component, inject } from '@angular/core'
import { AccessService } from '../access.services'

@Component({
  selector: 'goeko-reset-password',

  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  accessService = inject(AccessService)
}
