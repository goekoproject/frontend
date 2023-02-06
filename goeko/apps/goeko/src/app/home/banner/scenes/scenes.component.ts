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

	meshText!: any;
	constructor(private _sphere: SphereService) {}

	ngOnInit(): void {
		const scene = this._sphere.createSceneSME(this.canvasRef, 19);
		scene.blockfreeActiveMeshesAndRenderingGroups = true;

		this._addActorsSecondary(scene);
		scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}

	ngAfterViewInit(): void {
		this._sphere.start();
		//	this.meshText = this._sphere._addText();
	}

	private _addActorsSecondary(scene: Scene) {
		const distancies = 18;
		scene.beginAnimation(
			this._sphere.createActorsSecondary('CleanTeach', 9, distancies, '5B9CB3', {
				x: 30,
				y: -20,
				z: 10,
			}),
			0,
			FPS,
			true,
			0.055
		);

		scene.beginAnimation(
			this._sphere.createActorsSecondary('Bank', 9, distancies, '3b6ebc', {
				x: -20,
				y: -30,
				z: -18,
			}),
			0,
			FPS,
			true,
			0.055
		);
	}
	/* 
	changeRotationX(event: any) {
		this.meshText.rotation.x = event.target.value;
	}
	changeRotationY(event: any) {
		this.meshText.rotation.y = event.target.value;
	}
	changeRotationZ(event: any) {
		this.meshText.rotation.y = event.target.value;
	} */
	changePosotionX(target: any) {
		this._sphere.light.getAbsolutePosition().x = target.value;
	}
	changePosotionY(target: any) {
		this._sphere.light.getAbsolutePosition().y = target.value;
	}

	changePosotionZ(target: any) {
		this._sphere.light.getAbsolutePosition().z = target.value;
	}
}
