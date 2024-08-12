import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'goeko-login-universal',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './login-universal.component.html',
  styleUrl: './login-universal.component.scss',
})
export class LoginUniversalComponent {
  constructor() {}
}
