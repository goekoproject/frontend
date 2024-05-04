import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeadResponse, LeadService } from '@goeko/store';
import { GoDateFormatPipe } from '@goeko/ui';
import { Observable } from 'rxjs';
import { ManagerLeadsService } from './manager-leads.services';

@Component({
    selector: 'goeko-leads-list',
    standalone: true,
    providers: [LeadService, ManagerLeadsService],
    templateUrl: './leads-list.component.html',
    styleUrl: './leads-list.component.scss',
    imports: [CommonModule, GoDateFormatPipe]
})
export class LeadsListComponent implements OnInit {

  public leads!: Observable<LeadResponse[]>;
  public lead?: LeadResponse;
  constructor(private managerLeadsService: ManagerLeadsService){}


  ngOnInit() {
      this.leads = this.managerLeadsService.getLeads();
      this._selectedLeadFirst();
  }
  
  selectedLead(lead: LeadResponse) {
    if(!lead) {
      return;
    }
    this.lead = lead;
  }

  private _selectedLeadFirst() {
    this.managerLeadsService.getLeads().subscribe((leads: LeadResponse[]) => { 
      if(leads) {
        this.lead = leads.at(0)
      }
    })
  }
}
