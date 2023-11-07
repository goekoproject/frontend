import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CATEGORY_SECTION } from '@goeko/business-ui';
import { EcosolutionsService } from '@goeko/store';
import { CardEcosolutions } from './card-ecosolutions.model';

@Component({
	selector: 'goeko-ecosolutions-list',
	templateUrl: './ecosolutions-list.component.html',
	styleUrls: ['./ecosolutions-list.component.scss'],
})
export class EcosolutionsListComponent implements OnInit {
	public categorySection = CATEGORY_SECTION;
	public ecosolutions!: CardEcosolutions[];
	private _cleanTechId!: string;
	constructor(private _ecosolutionsService: EcosolutionsService, private _route: ActivatedRoute) {}

	ngOnInit(): void {
		this._cleanTechId = this._route.snapshot.paramMap.get('id') as string;

		this._ecosolutionsService.getByIdCleantechId(this._cleanTechId).subscribe((ecosolutions: any) => {
			if (ecosolutions && ecosolutions.length > 0) {
				this.ecosolutions = ecosolutions.map((solution: any) => new CardEcosolutions(solution));
			}
		});
	}
}
