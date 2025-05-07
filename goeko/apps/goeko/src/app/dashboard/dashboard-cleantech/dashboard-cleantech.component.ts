import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { EcosolutionCategorySelectorComponent, InfoActionCardComponent } from '@goeko/business-ui'
import { LeadCleantechService, LeadResponse } from '@goeko/store'
import { ButtonModule, DialogService } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { DashboardCleantechService } from './dashboard-cleantech.service'

@Component({
  selector: 'goeko-dashboard-cleantech',
  standalone: true,
  imports: [CommonModule, ButtonModule, InfoActionCardComponent, TranslatePipe],
  providers: [DashboardCleantechService, LeadCleantechService],
  templateUrl: './dashboard-cleantech.component.html',
  styleUrls: ['./dashboard-cleantech.component.scss'],
})
export class DashboardCleantechComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _dialogService = inject(DialogService)
  public cleantechLeads!: Array<LeadResponse>
  public cleantechLeads$!: Observable<Array<LeadResponse>>
  public id = input.required<string>()
  constructor(private dashboardCleantechService: DashboardCleantechService) {}

  ngOnInit(): void {
    this.cleantechLeads$ = this.dashboardCleantechService.getLeads()
  }

  goLeadList = () => {
    this._router.navigate(['leads'], { relativeTo: this._route.parent?.parent })
  }

  createEcosolution = () => {
    this._dialogService
      .open(EcosolutionCategorySelectorComponent)
      .afterClosed()
      .subscribe((category) => {
        this._router.navigate(['../cleantech-ecosolutions/new', category], {
          relativeTo: this._route.parent,
          queryParams: { cleantechId: this.id() },
        })
      })
  }
}
