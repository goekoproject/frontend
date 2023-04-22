import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InteractionService } from './scenes/interaction.service';

@Component({
	selector: 'go-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
	@ViewChild('worldmap') worldmap!: ElementRef<SVGAElement>;
	isShowing = false;
	europeMap!: ElementRef<SVGAElement>;
	constructor(private _interactionService: InteractionService, private _renderer: Renderer2) {}

	ngOnInit(): void {
		this.isShowing = true;

		this.onSMEClick();
	}

	public onSMEClick() {
		this._interactionService.onSMEClick.subscribe((res) => {
			const paths = (this.worldmap as any).element.nativeElement.querySelectorAll('path');
			this.europeMap = paths[3];
			this._modifyColorEurope();
		});
	}

	private _modifyColorEurope() {
		this._renderer.addClass(this.europeMap, 'fill-green');
	}

	onClickText() {}
}
