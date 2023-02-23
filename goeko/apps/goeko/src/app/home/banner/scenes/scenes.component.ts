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

	x!: number;
	y!: number;
	z!: number;
	meshText!: any;
	constructor(private _sphere: SphereService) {}

	ngOnInit(): void {
		const scene = this._sphere.createSceneSME(this.canvasRef, 22);
		scene.blockfreeActiveMeshesAndRenderingGroups = true;

		this._addActorsSecondary(scene);
		scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}

	ngAfterViewInit(): void {
		this._sphere.start();
		//	this.meshText = this._sphere._addText();
	}

	private _addActorsSecondary(scene: Scene) {
		const distancies = 22;
		scene.beginAnimation(
			this._sphere.createActorsSecondary('CleanTeach', 10, distancies, '5B9CB3', {
				x: 40,
				y: -20,
				z: 10,
			}),
			0,
			FPS,
			true,
			0.065
		);

		scene.beginAnimation(
			this._sphere.createInsideActorSecondary('CleanTeachSmall', 6, distancies, '5B9CB3', {
				x: 40,
				y: -20,
				z: 10,
			}),
			0,
			FPS,
			true,
			0.065
		);

		scene.beginAnimation(
			this._sphere.createActorsSecondary('Bank', 10, distancies, '3b6ebc', {
				x: 40,
				y: -20,
				z: -18,
			}),
			0,
			FPS,
			true,
			0.065
		);

		scene.beginAnimation(
			this._sphere.createInsideActorSecondary('BankSmall', 6, distancies, '3b6ebc', {
				x: 40,
				y: -30,
				z: -18,
			}),
			0,
			FPS,
			true,
			0.065
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
		this.x = target.value;
		this._sphere.rotateGroud(this.x, this.z, this.y);
		//		this._sphere.light.getAbsolutePosition().x = target.value;
	}
	changePosotionY(target: any) {
		this.y = target.value;
		this._sphere.rotateGroud(this.x, this.z, this.y);

		//this._sphere.light.getAbsolutePosition().y = target.value;
	}

	changePosotionZ(target: any) {
		this.z = target.value;
		this._sphere.rotateGroud(this.x, this.z, this.y);

		//	this._sphere.light.getAbsolutePosition().z = target.value;
	}
}
