import { Injectable, inject } from '@angular/core';
import { Lead, LeadResponse, LeadService, UserService } from '@goeko/store';
import { Observable } from 'rxjs';

@Injectable()
export class ManagerLeadsService {
    private _cleantechId = inject(UserService).userProfile().id;
    constructor(private _leadService: LeadService) { }


    getLeads(): Observable<LeadResponse[]> {
        return this._leadService.getLeadByCleantech(this._cleantechId);
    }
    
}