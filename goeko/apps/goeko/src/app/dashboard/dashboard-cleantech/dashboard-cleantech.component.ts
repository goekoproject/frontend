import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LeadCleantechService, LeadResponse } from '@goeko/store'
import { Observable } from 'rxjs'
import { DashboardCleantechService } from './dashboard-cleantech.service'

@Component({
  selector: 'goeko-dashboard-cleantech',
  providers: [DashboardCleantechService, LeadCleantechService],
  templateUrl: './dashboard-cleantech.component.html',
  styleUrls: ['./dashboard-cleantech.component.scss'],
})
export class DashboardCleantechComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  public cleantechLeads!: Array<LeadResponse>
  public cleantechLeads$!: Observable<Array<LeadResponse>>
  constructor(private dashboardCleantechService: DashboardCleantechService) {}

  ngOnInit(): void {
    this.cleantechLeads$ = this.dashboardCleantechService.getLeads()
  }

  goLeadList = () => {
    this._router.navigate(['leads'], { relativeTo: this._route.parent?.parent })
  }
}
