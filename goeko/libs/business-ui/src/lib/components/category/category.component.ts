import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'goeko-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		'[attr.selected]': 'selected',
	},
})
export class CategoryComponent {
	@ViewChild('iconCategory') iconCategory!: ElementRef<SVGAElement>;

	@Input() selected!: boolean;

	@Input() icon!: string;


	constructor() {}
}
