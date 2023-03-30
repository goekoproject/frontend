import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionManager, ExecuteCodeAction, Scene } from '@babylonjs/core';
import { BANK, BANK_INNER } from '../sphere/contstants/bank.constants';
import { CLEANTECH, CLEANTECH_INNER } from '../sphere/contstants/cleantech.constants';
import { MeshActors } from '../sphere/models/sphere.model';
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

	private _bank!: any;
	private planeText!: any;

	scene!: Scene;
	constructor(
		private _sphere: SphereService,
		private _router: Router,
		private _interactionService: InteractionService
	) {}

	ngOnInit(): void {
		this._sphere.configScene(this.canvasRef);
		this.scene = this._sphere.createSME(14);
		this.planeText = this._sphere.createMaterialText();
		this._sphere.makeRotate();
		this._createEventClickSME(this.scene);
		this._createEventClickSMEPlane(this.scene);

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
				/* 	this._sphere.stopRotate();
				this._sphere.startAnimationMaterialMain(); */
				this._interactionService.onSMEClick.next(true);
				this._router.navigate([], { fragment: 'sme' });
			})
		);
	}

	private _createEventClickSMEPlane(scene: Scene) {
		this.planeText.actionManager = new ActionManager(scene);

		this.planeText.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
				//	this._sphere.startAnimationMaterialMain();
				this._interactionService.onSMEClick.next(true);
				this._router.navigate([], { fragment: 'sme' });
			})
		);
	}

	private _addActorsSecondary(scene: Scene) {
		this._animationCleanTech(scene);
		this._animationBank(scene);
	}

	private _animationCleanTech(scene: Scene) {
		const cleanTechMesh = new MeshActors(CLEANTECH);
		const cleanTechMeshInner = new MeshActors(CLEANTECH_INNER);

		this._cleanTeach = this._sphere.createActorsSecondary(cleanTechMesh);
		this._clickCleanTeach();
		const cleanTeachInner = this._sphere.createInsideActorSecondary(cleanTechMeshInner);

		scene.beginAnimation(this._cleanTeach, 0, FPS, true, SPEED);
		scene.beginAnimation(cleanTeachInner, 0, FPS, true, SPEED);
	}

	private _animationBank(scene: Scene) {
		const bankMesh = new MeshActors(BANK);
		const bankMeshInner = new MeshActors(BANK_INNER);
		this._bank = this._sphere.createActorsSecondary(bankMesh);
		const bankinner = this._sphere.createInsideActorSecondary(bankMeshInner);
		scene.beginAnimation(this._bank, 0, FPS, true, SPEED);
		scene.beginAnimation(bankinner, 0, FPS, true, SPEED);
	}

	private _clickCleanTeach() {
		this._cleanTeach.actionManager = new ActionManager(this.scene);
		this._cleanTeach.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
				/* 	this._sphere.stopRotate();
				this._sphere.startAnimationMaterialMain(); */
				this._interactionService.onCleanTeachClick.next(true);
				this._router.navigate([], { fragment: 'cleanteach' });
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
