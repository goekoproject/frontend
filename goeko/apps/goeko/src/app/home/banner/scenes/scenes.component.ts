import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Scene } from '@babylonjs/core';
import { FPS, SphereService } from './sphere.service';

@Component({
	selector: 'goeko-scenes',
	templateUrl: './scenes.component.html',
	styleUrls: ['./scenes.component.scss'],
})
export class ScenesComponent implements OnInit, AfterViewInit {
	@ViewChild('canvas', { static: true })
	canvasRef!: ElementRef<HTMLCanvasElement>;

	constructor(private _sphere: SphereService) {}

	ngOnInit(): void {
		const scene = this._sphere.createScene(this.canvasRef);
		this._addActorsSecondary(scene);
	}

	ngAfterViewInit(): void {
		this._sphere.start();
	}

	private _addActorsSecondary(scene: Scene) {
		scene.beginAnimation(
			this._sphere.createActorsSecondary('CleanTeach', 4, 8, '5B9CB3', {
				x: 30,
				y: 20,
				z: 20,
			}),
			0,
			FPS,
			true,
			0.05
		);

		scene.beginAnimation(
			this._sphere.createActorsSecondary('Bank', 4, 8, '3b6ebc', {
				x: 10,
				y: 10,
				z: 10,
			}),
			0,
			FPS,
			true,
			0.05
		);
	}
}
