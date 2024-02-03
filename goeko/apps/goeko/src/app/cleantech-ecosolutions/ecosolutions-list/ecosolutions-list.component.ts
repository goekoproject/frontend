import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClassificationCategory,
  EcosolutionsService
} from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services';
import { CardEcosolutions } from './card-ecosolutions.model';

@Component({
  selector: 'goeko-ecosolutions-list',
  templateUrl: './ecosolutions-list.component.html',
  styleUrls: ['./ecosolutions-list.component.scss'],
})
export class EcosolutionsListComponent implements OnInit {
  public categorySection = this._cleantechEcosolutionsService.categories();
  public ecosolutions!: CardEcosolutions[];
  public cleanTechId!: string;

  constructor(
    private _ecosolutionsService: EcosolutionsService,
    private _route: ActivatedRoute,
    private _roter: Router,
    private translateService: TranslateService,
    private _cleantechEcosolutionsService: CleantechEcosolutionsService
  ) {}

  ngOnInit(): void {
    this.cleanTechId = this._route.snapshot.paramMap.get('id') as string;
    this.getAllEcosolutionsByCleanTech();
  }

  getAllEcosolutionsByCleanTech() {
    this._ecosolutionsService
      .getEcosolutionsByCleantechId(this.cleanTechId)
      .subscribe((ecosolutions: any) => {
        this.ecosolutions = ecosolutions?.map(
          (ecosolution: any) =>
            new CardEcosolutions(ecosolution, this.translateService)
        );
      });
  }

  viewEcosolution(ecosolution: CardEcosolutions) {
    this._goToEcosolutionForm('detail', ecosolution.id, {
      mainCategory: ecosolution.mainCategory,
      isReadOnly: true,
    });
  }
  editEcosolution(ecosolution: CardEcosolutions) {
    this._goToEcosolutionForm('edit', ecosolution.id, {
      mainCategory: ecosolution.mainCategory,
    });
  }

  deleteEcosolution(ecosolution: CardEcosolutions) {
    this._ecosolutionsService
      .deleteEcosolution(ecosolution.id)
      .subscribe((res: any) => {
        this.getAllEcosolutionsByCleanTech();
      });
  }

  private _goToEcosolutionForm(path: string, id: string, arg: any) {
    this._roter.navigate([`./${path}`, id], {
      queryParams: arg,
      relativeTo: this._route,
    });
  }

  selectedTab(category: ClassificationCategory) {
    this._cleantechEcosolutionsService.categorySelected.set(category);
  }
}
