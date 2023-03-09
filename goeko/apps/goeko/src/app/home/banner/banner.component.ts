import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InteractionService } from './scenes/interaction.service';

@Component({
	selector: 'go-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
	@ViewChild('worldmap') worldmap!: ElementRef<SVGAElement>;

	constructor(private _interactionService: InteractionService, private _renderer: Renderer2) {}

	ngOnInit(): void {
		this.onClickWorldMap();
	}

	onClickWorldMap() {
		this._interactionService.onSMEClick.subscribe((res) => {
			const paths = (this.worldmap as any).element.nativeElement.querySelectorAll('path');
			const europeMap = paths[3];
			this._renderer.addClass(europeMap, 'fill-green');

			this._renderer.setAttribute(europeMap, 'fill', 'rgba(33, 166, 80, 0.7)');
			console.log(europeMap);
		});
	}
}
