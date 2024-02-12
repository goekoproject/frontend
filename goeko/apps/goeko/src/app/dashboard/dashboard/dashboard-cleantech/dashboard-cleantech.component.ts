import { Component, OnInit } from '@angular/core';
import { LeadResponse, LeadService } from '@goeko/store';
import { Observable } from 'rxjs';
import { DashboardCleantechService } from './dashboard-cleantech.service';

@Component({
	selector: 'goeko-dashboard-cleantech',
	providers:[DashboardCleantechService,LeadService],
	templateUrl: './dashboard-cleantech.component.html',
	styleUrls: ['./dashboard-cleantech.component.scss'],
})
export class DashboardCleantechComponent implements OnInit  {
	public cleantechLeads!: Array<LeadResponse>;
    public cleantechLeads$!: Observable<Array<LeadResponse>>;
	constructor(
		private dashboardCleantechService: DashboardCleantechService){
			
		}

	ngOnInit(): void {
		this.cleantechLeads$ = this.dashboardCleantechService.getLeads();
	}
}
