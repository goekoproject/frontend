import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CATEGORIES, CATEGORY_SECTION } from '@goeko/business-ui';
import { EcosolutionsService } from '@goeko/store';
import { CardEcosolutions } from './card-ecosolutions.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'goeko-ecosolutions-list',
	templateUrl: './ecosolutions-list.component.html',
	styleUrls: ['./ecosolutions-list.component.scss'],
})
export class EcosolutionsListComponent implements OnInit {
	public categorySection = CATEGORY_SECTION;
	public ecosolutions!: CardEcosolutions[];

	public cleanTechId!: string;
	constructor(
		private _ecosolutionsService: EcosolutionsService,
		private _route: ActivatedRoute,
		private translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.cleanTechId = this._route.snapshot.paramMap.get('id') as string;
		this.getAllEcosolutionsByCleanTech();
	}

	getAllEcosolutionsByCleanTech() {
		this._ecosolutionsService.getByIdCleantechId(this.cleanTechId).subscribe((ecosolutions: any) => {
			if (ecosolutions && ecosolutions.length > 0) {
				this.ecosolutions = ecosolutions.map(
					(ecosolution: any) => new CardEcosolutions(ecosolution, this.translateService)
				);
			}
		});
	}

	deleteEcosolution(ecosolution: CardEcosolutions) {
		this._ecosolutionsService.deleteEcosolution(ecosolution.id).subscribe((res: any) => {
			this.getAllEcosolutionsByCleanTech();
		});
	}
}
