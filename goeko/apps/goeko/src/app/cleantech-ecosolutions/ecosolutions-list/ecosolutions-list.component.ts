import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CATEGORIES, CATEGORY_SECTION } from '@goeko/business-ui';
import { EcosolutionsService } from '@goeko/store';
import { CardEcosolutions } from './card-ecosolutions.model';

@Component({
	selector: 'goeko-ecosolutions-list',
	templateUrl: './ecosolutions-list.component.html',
	styleUrls: ['./ecosolutions-list.component.scss'],
})
export class EcosolutionsListComponent implements OnInit {
	public categorySection = CATEGORY_SECTION;
	public ecosolutionsCo2!: CardEcosolutions[];
	public ecosolutionsWaste!: CardEcosolutions[];
	public ecosolutionsWater!: CardEcosolutions[];
	public ecosolutionsHp!: CardEcosolutions[];

	public cleanTechId!: string;
	constructor(private _ecosolutionsService: EcosolutionsService, private _route: ActivatedRoute) {}

	ngOnInit(): void {
		this.cleanTechId = this._route.snapshot.paramMap.get('id') as string;

		this._ecosolutionsService.getByIdCleantechId(this.cleanTechId).subscribe((ecosolutions: any) => {
			if (ecosolutions && ecosolutions.length > 0) {
				this._buildEcosolutionsCo2Emossion(ecosolutions);
				this._buildEcosolutionsWaste(ecosolutions);
				this._buildEcosolutionsWater(ecosolutions);
				this._buildEcosolutionsHazardousProduct(ecosolutions);
			}
		});
	}
	private _buildEcosolutionsCo2Emossion(ecosolutions: any) {
		this.ecosolutionsCo2 = ecosolutions
			.filter((ecosolution: any) => ecosolution.classification.mainCategory === CATEGORIES.CO2_EMISSION)
			.map((solution: any) => new CardEcosolutions(solution));
	}

	private _buildEcosolutionsWaste(ecosolutions: any) {
		this.ecosolutionsWaste = ecosolutions
			.filter((ecosolution: any) => ecosolution.classification.mainCategory === CATEGORIES.WASTE)
			.map((solution: any) => new CardEcosolutions(solution));
	}
	private _buildEcosolutionsWater(ecosolutions: any) {
		this.ecosolutionsWaste = ecosolutions
			.filter((ecosolution: any) => ecosolution.classification.mainCategory === CATEGORIES.WATER)
			.map((solution: any) => new CardEcosolutions(solution));
	}
	private _buildEcosolutionsHazardousProduct(ecosolutions: any) {
		this.ecosolutionsHp = ecosolutions
			.filter((ecosolution: any) => ecosolution.classification.mainCategory === CATEGORIES.HAZARDOUS_PRODUCT)
			.map((solution: any) => new CardEcosolutions(solution));
	}
}
