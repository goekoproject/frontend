import { CommonModule } from '@angular/common'
import { APP_INITIALIZER, Component } from '@angular/core'
import { LoadDataUser, loadDataUserFactory } from '@goeko/business-ui'
import { AuthService } from '@goeko/core'

@Component({
  selector: 'goeko-login-universal',
  standalone: true,
  imports: [CommonModule],
  providers: [

  ],
  templateUrl: './login-universal.component.html',
  styleUrl: './login-universal.component.scss',
})
export class LoginUniversalComponent {
  constructor(private _authService: AuthService) {
    this._authService.universalLogin()
  }
}
