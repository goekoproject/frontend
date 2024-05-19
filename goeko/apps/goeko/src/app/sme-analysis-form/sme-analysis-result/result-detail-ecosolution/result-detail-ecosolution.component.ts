import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DataSelect,
  Recommendation,
  SmeAnalysisStoreService,
} from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
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
  constructor(private _smeAnalysisStore: SmeAnalysisStoreService, private _router:Router) {}

  ngOnInit(): void {
    this._smeAnalysisStore
      .getDetailEcosolutions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (detailsEcosolution: Recommendation) =>
          (this.detailsEcosolution = detailsEcosolution)
      );
  }

  goBack() {
    this._router.navigate(['sme-analysis/results', this.detailsEcosolution.id])
  }
}
