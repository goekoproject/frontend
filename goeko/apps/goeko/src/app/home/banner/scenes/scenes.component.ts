import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionManager, ExecuteCodeAction, Scene } from '@babylonjs/core';
import { InteractionService } from './interaction.service';
import { FPS, SPEED, SphereService } from './sphere.service';

@Component({
	selector: 'goeko-scenes',
	templateUrl: './scenes.component.html',
	styleUrls: ['./scenes.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'scene-container',
	},
})
export class ScenesComponent implements OnInit, AfterViewInit {
	@ViewChild('canvas', { static: true })
	canvasRef!: ElementRef<HTMLCanvasElement>;

	x!: number;
	y!: number;
	z!: number;
	meshText!: any;

	get sphereSME() {
		return this._sphere._sme;
	}

	public get cleanTeach(): any {
		return this._cleanTeach;
	}
	public set cleanTeach(value: any) {
		this._cleanTeach = value;
	}
	private _cleanTeach!: any;

	scene!: Scene;
	constructor(private _sphere: SphereService, private _interactionService: InteractionService) {}

	ngOnInit(): void {
		this._sphere.configScene(this.canvasRef);
		this.scene = this._sphere.createSME(22);
		this._sphere.createMaterialText();
		this._sphere.makeRotate();
		this._createEventClickSME(this.scene);

		this.scene.blockfreeActiveMeshesAndRenderingGroups = true;

		this.scene.blockfreeActiveMeshesAndRenderingGroups = false;
		this._addActorsSecondary(this.scene);
	}

	ngAfterViewInit(): void {
		this._sphere.start();
	}

	private _createEventClickSME(scene: Scene) {
		this.sphereSME.actionManager = new ActionManager(scene);
		this.sphereSME.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
				this._sphere.stopRotate();
				this._sphere.startAnimationMaterialMain();
				this._interactionService.onSMEClick.next(true);
			})
		);
	}

	private _addActorsSecondary(scene: Scene) {
		const distancies = 20;
		this._animationCleanTech(scene, distancies);
		this._animationBank(scene, distancies);
	}

	private _animationCleanTech(scene: Scene, distancies: number) {
		this._cleanTeach = this._sphere.createActorsSecondary('CleanTeach', 10, distancies, '5B9CB3', {
			x: 40,
			y: -20,
			z: 10,
		});

		scene.beginAnimation(this._cleanTeach, 0, FPS, true, SPEED);

		scene.beginAnimation(
			this._sphere.createInsideActorSecondary('CleanTeachSmall', 6, distancies, '5B9CB3', {
				x: 40,
				y: -20,
				z: 10,
			}),
			0,
			FPS,
			true,
			SPEED
		);
	}

	private _animationBank(scene: Scene, distancies: number) {
		scene.beginAnimation(
			this._sphere.createActorsSecondary('Bank', 10, distancies, '3b6ebc', {
				x: 40,
				y: -20,
				z: -18,
			}),
			0,
			FPS,
			true,
			SPEED
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
			SPEED
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
