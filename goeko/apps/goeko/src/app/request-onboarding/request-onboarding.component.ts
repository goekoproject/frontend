import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { OperationDirective, SwitcherOperationComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-request-onboarding',
  standalone: true,
  imports: [CommonModule, SwitcherOperationComponent, OperationDirective, TranslatePipe, RouterOutlet],
  templateUrl: './request-onboarding.component.html',
  styleUrl: './request-onboarding.component.scss',
})
export class RequestOnboardingComponent {
  public requestsOnboarding = input.required<string>()
}
