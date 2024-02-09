import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeRequestResponse, SmeService } from '@goeko/store';
import { DISPLAY_COLUMNS } from './display-columns.contants';
import { map } from 'rxjs';

@Component({
  selector: 'goeko-sme-analysis-request',
  templateUrl: './sme-request.component.html',
  styleUrl: './sme-request.component.scss',
})
export class SmeRequestAnalisysComponent implements OnInit {

  public analysisRequests!: SmeRequestResponse[];
  public displayColumns = DISPLAY_COLUMNS;
  private _smeId!: string;

  constructor(private _smeServices: SmeService,    
    private _route: ActivatedRoute,
    private _router: Router
    ){

  }

  ngOnInit(): void {
    this._smeId = this._route.snapshot.paramMap.get('id') as string;
    this._getAnalysisRequests();
  }

  private _getAnalysisRequests() {
    if(!this._smeId) {
      return;
    }
    this._smeServices.getAnalysisRequest(this._smeId)
    .subscribe(analysisRequests => this.analysisRequests = analysisRequests);
  }
  newRequest() {
      this._router.navigate(['sme-analysis/new'], {
        queryParams: {
          smeId: this._smeId
        }
      })
  }

  goToDetails(request:SmeRequestResponse ) {
    this._router.navigate(['sme-analysis/request'], {
      queryParams: {
        smeId: this._smeId,
        requestId: request.id
      }
    });
  }

  deleteRequest(request:SmeRequestResponse) {
    this._smeServices.deleteRequests(request.id).subscribe(res => {
      this._getAnalysisRequests();

    });
  }
}
