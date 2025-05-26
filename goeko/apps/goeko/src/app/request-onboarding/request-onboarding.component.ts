import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryComponent } from '@goeko/business-ui'

@Component({
  selector: 'goeko-request-onboarding',
  standalone: true,
  imports: [CommonModule, CategoryComponent],
  templateUrl: './request-onboarding.component.html',
  styleUrl: './request-onboarding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestOnboardingComponent {}
