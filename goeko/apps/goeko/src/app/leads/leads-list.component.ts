import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead, LeadResponse, LeadService } from '@goeko/store';
import { ManagerLeadsService } from './manager-leads.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'goeko-leads-list',
  standalone: true,
  imports: [CommonModule],
  providers: [LeadService, ManagerLeadsService],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.scss',
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
