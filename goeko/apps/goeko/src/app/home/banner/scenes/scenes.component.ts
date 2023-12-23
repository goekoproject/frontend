import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Scene } from '@babylonjs/core';
import { BANK, BANK_PROP } from '../sphere/contstants/bank.constants';
import { CLEANTECH, CLEANTECH_PROP } from '../sphere/contstants/cleantech.constants';
import { SME } from '../sphere/contstants/sme-constants';
import { MeshActors } from '../sphere/models/sphere.model';
import { InteractionService } from './interaction.service';
import { DIRECTION_ANGLE, SphereService } from './sphere.service';
import { TranslateService } from '@ngx-translate/core';

const TEXTURE_SME = 'assets/texture-gray-1.png';
const EMISSIVE_COLOR_SME = '#47525E';
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

	public _sphereSme!: MeshActors;
	private _sphereCleanTech!: MeshActors;
	private _sphereBank!: MeshActors;

	scene!: Scene;
	constructor(
		private _sphereService: SphereService,
		private _router: Router,
		private _interactionService: InteractionService,
		private _translate: TranslateService
	) {}

	ngOnInit(): void {
		this.scene = this._sphereService.getScene(this.canvasRef);
		this.scene.blockfreeActiveMeshesAndRenderingGroups = true;
		this.scene.blockfreeActiveMeshesAndRenderingGroups = false;
		this._onChangeLangs();
	}

	ngAfterViewInit(): void {
		this._sphereService.start();
		this._configMeshes();
	}

	private _onChangeLangs() {
		this._translate.onLangChange.subscribe(() => {
			this.scene = this._sphereService.getScene(this.canvasRef);
			this._configMeshes();
		});
	}

	private _configMeshes(): void {
		this._createSME();
		this._createCleanTech();
		this._createBank();
		this._sphereSme.material.metallic = 1;
		this._sphereSme.setDirectionalLight('#847575', '#847575');
		this._sphereCleanTech.onHoverActors();
		this._sphereBank.onHoverActors();
		this._sphereSme.onHoverActors();
	}

	private _createSME() {
		this._sphereSme = new MeshActors(this._sphereService, this.scene, SME, this._translate).build(SME.title);
		/* 		this._sphereSme.setShadows('#847575');
		 */
		this._sphereSme.setEmissiveColor(EMISSIVE_COLOR_SME);
		this._createEventClickSME();
	}

	changeColor(color: string) {
		this._sphereSme.onHoverActors(color);
	}
	changeColor2(color: string) {
		console.log(color);
		this._sphereCleanTech.setEmissiveColor(color);
	}
	private _createEventClickSME() {
		this._sphereSme.onClick(() => {
			this._interactionService.onSMEClick.next(true);
		});
	}

	private _createCleanTech() {
		this._sphereCleanTech = new MeshActors(this._sphereService, this.scene, CLEANTECH, this._translate).build(
			CLEANTECH.title
		);
		this._sphereCleanTech.setEmissiveColor(CLEANTECH_PROP.emissiveColor);
		this._sphereService.createBorder(this._sphereCleanTech.rawMesh, LIGHT_BORDER_SME);
		this._createEventCleanTeach();

		this.scene.registerBeforeRender(() =>
			this._sphereService.updateOrbitingSpherePosition(this._sphereCleanTech.rawMesh, DIRECTION_ANGLE.LEFT)
		);
	}

	private _createEventCleanTeach() {
		this._sphereCleanTech.onClick(() => {
			this._interactionService.onCleanTeachClick.next(true);
		});
	}

	private _createBank() {
		this._sphereBank = new MeshActors(this._sphereService, this.scene, BANK, this._translate).build(BANK.title);
		this._sphereBank.setEmissiveColor(BANK_PROP.emissiveColor);
		this._sphereService.createBorder(this._sphereBank.rawMesh, LIGHT_BORDER_SME);
		this._createEventBank();
		this.scene.registerBeforeRender(() =>
			this._sphereService.updateOrbitingSpherePosition(this._sphereBank.rawMesh, DIRECTION_ANGLE.LEFT)
		);
	}

	private _createEventBank() {
		this._sphereBank.onClick(() => {
			this._interactionService.onBankClick.next(true);
		});
	}

	changeRotationX(event: any) {
		this._sphereSme.rawMesh.rotation.x = event.target.value;
	}
	changeRotationY(event: any) {
		/* 		this._sphereSme.rawMesh.rotation.y = event.target.value;
		 */
	}
	changeRotationZ(event: any) {
		this._sphereSme.rawMesh.rotation.z = event.target.value;
	}

	getFocusElements() {}
}
