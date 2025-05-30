import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { ButtonModule, OperationDirective, SwitcherOperationComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-request-onboarding',
  standalone: true,
  imports: [CommonModule, SwitcherOperationComponent, OperationDirective, TranslatePipe, RouterOutlet, RouterLink, ButtonModule],
  templateUrl: './request-onboarding.component.html',
  styleUrl: './request-onboarding.component.scss',
})
export class RequestOnboardingComponent {
  id = input.required<string>()
}
