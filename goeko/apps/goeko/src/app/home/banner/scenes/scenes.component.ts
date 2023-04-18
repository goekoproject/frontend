import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Scene } from '@babylonjs/core';
import { BANK, BANK_PROP } from '../sphere/contstants/bank.constants';
import { CLEANTECH, CLEANTECH_PROP } from '../sphere/contstants/cleantech.constants';
import { SME } from '../sphere/contstants/sme-constants';
import { MeshActors } from '../sphere/models/sphere.model';
import { InteractionService } from './interaction.service';
import { SphereService } from './sphere.service';

const TEXTURE_SME = 'assets/texture-gray-1.png';
const EMISSIVE_COLOR_SME = '#c0c0c0';
const LIGHT_BORDER_SME = 0.2;
const LIGHT_BORDER_SME_COLOR = '#FFFF00';

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

	private _sphereCleanTech!: any;

	private _sphereBank!: any;
	private planeText!: any;

	scene!: Scene;
	constructor(
		private _sphereService: SphereService,
		private _router: Router,
		private _interactionService: InteractionService
	) {}

	ngOnInit(): void {
		this.scene = this._sphereService.getScene(this.canvasRef);
		this.scene.blockfreeActiveMeshesAndRenderingGroups = true;
		this.scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}

	ngAfterViewInit(): void {
		this._sphereService.start();
		this._createSME();
		this._createCleanTech();
		this._createBank();
	}

	private _createSME() {
		this._sphereSme = new MeshActors(this._sphereService, this.scene, SME).build(SME.title);
		this._sphereSme.setShadows('#847575');
		this._sphereSme.setDiffuseTexture(TEXTURE_SME);
		this._sphereSme.setHemisphericLight();
		//	this._sphereSme.setEmissiveColor(EMISSIVE_COLOR_SME);
		/* 		this._sphereService.makeRotate(this._sphereSme.rawMesh);
		 */
		//	this._sphereService.createBorder(this._sphereSme.rawMesh, LIGHT_BORDER_SME);
		//this._createEventClickSME();
	}

	changeColor(color: string) {
		console.log(color);
		this._sphereBank.setEmissiveColor(color);
		this._sphereBank.setEmissiveColor(color);
	}

	private _createEventClickSME() {
		this._sphereSme.onClick(() => {
			this._interactionService.onSMEClick.next(true);
		});
	}

	private _createCleanTech() {
		this._sphereCleanTech = new MeshActors(this._sphereService, this.scene, CLEANTECH).build(CLEANTECH.title);
		this._sphereCleanTech.setHemisphericLight();
		this._sphereCleanTech.setEmissiveColor(CLEANTECH_PROP.emissiveColor);
		this._sphereCleanTech.setDiffuseTexture(TEXTURE_SME);
		this._sphereService.createBorder(this._sphereCleanTech.rawMesh, LIGHT_BORDER_SME);

		this.scene.registerBeforeRender(() =>
			this._sphereService.updateOrbitingSpherePosition(this._sphereCleanTech.rawMesh)
		);
	}

	private _createBank() {
		this._sphereBank = new MeshActors(this._sphereService, this.scene, BANK).build(BANK.title);
		this._sphereBank.setHemisphericLight();
		this._sphereBank.setEmissiveColor(BANK_PROP.emissiveColor);
		this._sphereBank.setDiffuseTexture(TEXTURE_SME);
		this._sphereService.createBorder(this._sphereBank.rawMesh, LIGHT_BORDER_SME);

		this.scene.registerBeforeRender(() =>
			this._sphereService.updateOrbitingSpherePosition(this._sphereBank.rawMesh)
		);
	}

	private _createEventCleanTeach() {
		this._sphereSme.onClick(() => {
			this._interactionService.onCleanTeachClick.next(true);
		});
	}

	/* 	private _hoverCleanTeach() {
		this._cleanTeach.actionManager = new ActionManager(this.scene);
		this._cleanTeach.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
				this._sphereService.addMaterialHover(this._cleanTeach);
			})
		);
	} */

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
}
