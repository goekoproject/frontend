import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { filter, map } from 'rxjs'

@Component({
  selector: 'goeko-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss',
})
export class FundingComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  title = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._route.firstChild?.snapshot?.title),
    ),
    { initialValue: 'Funding' },
  )
}


