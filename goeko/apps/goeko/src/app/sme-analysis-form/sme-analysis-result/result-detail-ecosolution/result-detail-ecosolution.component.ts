import { Component, Input, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CATEGORIES, DialogProvincesComponent } from '@goeko/business-ui'
import { DataSelect, EcosolutionSearchResponse, LocationCountryTranslated, LocationRegions, SmeService } from '@goeko/store'
import { AutoUnsubscribe, DialogService } from '@goeko/ui'
import { Subject, takeUntil } from 'rxjs'
import { SECTION_FEATURE_DETAIL_ECOSOLUTION } from './detail-feature.constants'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@AutoUnsubscribe()
@Component({
  selector: 'goeko-result-detail-ecosolution',
  templateUrl: './result-detail-ecosolution.component.html',
  styleUrls: ['./result-detail-ecosolution.component.scss'],
})
export class ResultDetailEcosolutionComponent implements OnInit {
  @Input() ecosolutionId!: string

  private destroy$ = new Subject<void>()
  public CATEGORIES = CATEGORIES
  public detailsEcosolution = signal<EcosolutionSearchResponse>({} as EcosolutionSearchResponse)
  public sectionFeatureDetail = SECTION_FEATURE_DETAIL_ECOSOLUTION
  public dataSelect = DataSelect as any

  private get _smeId() {
    return this._route.parent?.snapshot.params?.['id']
  }

  constructor(
    private _smeServices: SmeService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: DialogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._getEcosolutionData()
  }

  private _getEcosolutionData() {
    this._smeServices
      .ecosolutionSearchById(this.ecosolutionId, this._smeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((detailsEcosolution: EcosolutionSearchResponse) => {
        console.log('detailedDescription:', detailsEcosolution.detailedDescription);
        this.detailsEcosolution.set(detailsEcosolution)
      })
  }
  goBack() {
    this._router.navigate(['results', this.detailsEcosolution()?.id], {
      relativeTo: this._route.parent?.parent,
    })
  }

  showProvinces(country: LocationCountryTranslated, provinces: Array<LocationRegions>) {
    this._dialogService
      .open(DialogProvincesComponent, {
        data: { country, provinces },
      })
      .afterClosed()
      .subscribe(() => console.log(country))
  }

  downloadCertified() {
    const certified = this.detailsEcosolution()?.documents[0]
    if (certified && certified.url) {
      window.open(certified.url, '_blank')
    }
  }

  public sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
