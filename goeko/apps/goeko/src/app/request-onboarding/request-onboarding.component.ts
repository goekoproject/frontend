import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router'
import { ButtonModule, OperationDirective, SwitcherOperationComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-request-onboarding',
  standalone: true,
  imports: [CommonModule, SwitcherOperationComponent, OperationDirective, RouterLink, TranslatePipe, RouterOutlet, ButtonModule],
  templateUrl: './request-onboarding.component.html',
  styleUrl: './request-onboarding.component.scss',
})
export class RequestOnboardingComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  onSelectOperation(operation: string | unknown) {
    if (typeof operation !== 'string' || !operation) {
      return
    }
    this._router.navigate([operation], { relativeTo: this._route })
  }
}
