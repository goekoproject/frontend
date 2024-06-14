import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogProvincesComponent } from '@goeko/business-ui';
import {
  DataSelect,
  LocationCountryTranslated,
  LocationRegions,
  Recommendation,
  SmeAnalysisStoreService
} from '@goeko/store';
import { AutoUnsubscribe, DialogService } from '@goeko/ui';
import { Subject, takeUntil } from 'rxjs';
import { SECTION_FEATURE_DETAIL_ECOSOLUTION } from './detail-feature.constants';

@AutoUnsubscribe()
@Component({
  selector: 'goeko-result-detail-ecosolution',
  templateUrl: './result-detail-ecosolution.component.html',
  styleUrls: ['./result-detail-ecosolution.component.scss'],
})
export class ResultDetailEcosolutionComponent implements OnInit {
  private destroy$ = new Subject<void>();

  public detailsEcosolution!: Recommendation;
  public sectionFeatureDetail = SECTION_FEATURE_DETAIL_ECOSOLUTION;
  public dataSelect = DataSelect as any;
  constructor(
    private _smeAnalysisStore: SmeAnalysisStoreService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._smeAnalysisStore
      .getDetailEcosolutions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (detailsEcosolution: Recommendation) =>
         {
           this.detailsEcosolution = detailsEcosolution
           this.detailsEcosolution.detailedDescription =   this.detailsEcosolution?.detailedDescription?.split("\n").join("<br />");
          }
      );
  }

  goBack() {
    this._router.navigate(
      ['results', this.detailsEcosolution.id],
      { relativeTo: this._route.parent?.parent}
    );
  }

  showProvinces(country: LocationCountryTranslated,provinces: Array<LocationRegions>) {
    this._dialogService.open(DialogProvincesComponent, {
      data: {country,provinces}
    }).afterClosed().subscribe(() => console.log(country));
  }
}
