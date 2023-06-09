import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InteractionService } from './scenes/interaction.service';

@Component({
	selector: 'go-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterViewInit {
	@ViewChild('worldmap') worldmap!: ElementRef<SVGAElement>;
	isShowing = false;
	europeMap!: ElementRef<SVGAElement>;
	public odsIcon = [6, 7, 9, 11, 12, 13, 14, 15];

	constructor(private _interactionService: InteractionService, private _renderer: Renderer2) {}

	ngOnInit(): void {
		this.isShowing = true;
		this.onSMEClick();
	}
	ngAfterViewInit(): void {
		this._modifyColorEurope();
	}
	public onSMEClick() {
		this._interactionService.onSMEClick.subscribe((res) => {});
	}

	private _modifyColorEurope() {
		setTimeout(() => {
			const paths = (this.worldmap as any).element.nativeElement.querySelectorAll('path');
			console.log(paths);
			this.europeMap = paths[3];
			this._renderer.addClass(this.europeMap, 'fill-green');
		}, 1000);
	}

	onClickText() {}
}
