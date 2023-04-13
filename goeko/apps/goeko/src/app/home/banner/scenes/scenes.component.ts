import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionManager, ExecuteCodeAction, Scene } from '@babylonjs/core';
import { SME } from '../sphere/contstants/sme-constants';
import { MeshActors } from '../sphere/models/sphere.model';
import { InteractionService } from './interaction.service';
import { SphereService } from './sphere.service';

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

	private _sphereSme!: any;

	public get cleanTeach(): any {
		return this._cleanTeach;
	}
	public set cleanTeach(value: any) {
		this._cleanTeach = value;
	}
	private _cleanTeach!: any;

	private _bank!: any;
	private planeText!: any;

	scene!: Scene;
	constructor(
		private _sphereService: SphereService,
		private _router: Router,
		private _interactionService: InteractionService
	) {}

	ngOnInit(): void {
		this.scene = this._sphereService.getScene(this.canvasRef);
		this._sphereSme = new MeshActors(this._sphereService, this.scene, SME).build('SME');
		this._sphereSme.addHemisphericLight();
		this._sphereSme.addDiffuseTexture();
		this._sphereService.makeRotate(this._sphereSme.rawMesh);

		//	this.planeText = this._sphereService.createMaterialText();
		/* 		this._sphereService.makeRotate();
		 */
		// this._createEventClickSME(this.scene);
		//this._createEventClickSMEPlane(this.scene);

		this.scene.blockfreeActiveMeshesAndRenderingGroups = true;
		this.scene.blockfreeActiveMeshesAndRenderingGroups = false;
		/* 		this._addActorsSecondary(this.scene);
		 */
	}

	ngAfterViewInit(): void {
		this._sphereService.start();
	}

	private _createEventClickSME(scene: Scene) {
		this._sphereSme.onClick(() => {
			this._interactionService.onSMEClick.next(true);
		});
	}

	private _createEventClickSMEPlane(scene: Scene) {
		this.planeText.actionManager = new ActionManager(scene);

		this.planeText.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
				//	this._sphereService.startAnimationMaterialMain();
				this._interactionService.onSMEClick.next(true);
				this._router.navigate([], { fragment: 'sme' });
			})
		);
	}

	private _addActorsSecondary(scene: Scene) {
		this._animationCleanTech(scene);
		//this._animationBank(scene);
	}

	private _animationCleanTech(scene: Scene) {
		/* 	const cleanTechMesh = new MeshActors(CLEANTECH);
		const cleanTechMeshInner = new MeshActors(CLEANTECH_INNER);

		this._cleanTeach = this._sphereService.createActorsSecondary(cleanTechMesh);
		this._clickCleanTeach();
		//this._hoverCleanTeach();
		const cleanTeachInner = this._sphereService.createInsideActorSecondary(cleanTechMeshInner);

		scene.beginAnimation(this._cleanTeach, 0, FPS, true, SPEED);
		scene.beginAnimation(cleanTeachInner, 0, FPS, true, SPEED); */
	}

	private _animationBank(scene: Scene) {
		/* 		const bankMesh = new MeshActors(BANK);
		const bankMeshInner = new MeshActors(BANK_INNER);
		this._bank = this._sphereService.createActorsSecondary(bankMesh);
		const bankinner = this._sphereService.createInsideActorSecondary(bankMeshInner);
		scene.beginAnimation(this._bank, 0, FPS, true, SPEED);
		scene.beginAnimation(bankinner, 0, FPS, true, SPEED); */
	}

	private _clickCleanTeach() {
		this._cleanTeach.actionManager = new ActionManager(this.scene);
		this._cleanTeach.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
				/* 	this._sphereService.stopRotate();
				this._sphereService.startAnimationMaterialMain(); */
				this._interactionService.onCleanTeachClick.next(true);
				this._router.navigate([], { fragment: 'cleanteach' });
			})
		);
	}

	private _hoverCleanTeach() {
		this._cleanTeach.actionManager = new ActionManager(this.scene);
		this._cleanTeach.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
				this._sphereService.addMaterialHover(this._cleanTeach);
			})
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
		this._sphereService.rotateGroud(this.x, this.z, this.y);
		//		this._sphereService.light.getAbsolutePosition().x = target.value;
	}
	changePosotionY(target: any) {
		this.y = target.value;
		this._sphereService.rotateGroud(this.x, this.z, this.y);

		//this._sphereService.light.getAbsolutePosition().y = target.value;
	}

	changePosotionZ(target: any) {
		this.z = target.value;
		this._sphereService.rotateGroud(this.x, this.z, this.y);

		//	this._sphereService.light.getAbsolutePosition().z = target.value;
	}
}
