import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'goeko-leads',
  template: `<router-outlet></router-outlet>`,
  styleUrl: './leads.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsComponent {}
