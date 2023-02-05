import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	Color3,
	DirectionalLight,
	DynamicTexture,
	GroundMesh,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRMaterial,
	PointLight,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	Vector3,
} from '@babylonjs/core';
import { colorToColorBY } from '@goeko/ui';
import { SceneService } from './scenes.service';
export const FPS = 60;

@Injectable({ providedIn: 'root' })
export class SphereService extends SceneService {
	private _sme!: Mesh;
	private _ground!: GroundMesh;

	readonly rotationAnim = new Animation(
		'rotate',
		'rotation.y',
		FPS,
		Animation.ANIMATIONTYPE_FLOAT,
		Animation.ANIMATIONLOOPMODE_CYCLE
	);

	readonly wobbleAnim = new Animation(
		'wobble',
		'position.y',
		FPS,
		Animation.ANIMATIONTYPE_FLOAT,
		Animation.ANIMATIONLOOPMODE_RELATIVE
	);
	readonly rotationKeys = [
		{ frame: 0, value: 0 },
		{ frame: FPS / 2, value: Math.PI },
		{ frame: FPS, value: Math.PI * 2 },
	];
	readonly wobbleKeys = [
		{ frame: 0, value: -1 },
		{ frame: FPS * 0.5, value: 1 },
		{ frame: FPS, value: -1 },
	];
	constructor(readonly zone: NgZone, @Inject(DOCUMENT) readonly doc: Document) {
		super(zone, document);
		this.rotationAnim.setKeys(this.rotationKeys);
		this.wobbleAnim.setKeys(this.wobbleKeys);
	}

	/**
	 *
	 * @param canvas Element of  scene
	 * @param size Size of sphere
	 * @returns
	 */
	createSceneSME(canvas: ElementRef<HTMLCanvasElement>, size: number = 20): Scene {
		if (this.scene) {
			this.scene.dispose();
		}
		super.createScene(canvas);
		this.light = new PointLight('sun', new Vector3(1, -10, -40), this.scene);

		this._sme = MeshBuilder.CreateSphere('sme', { segments: 32, diameter: size });
		const sphereMaterial = new StandardMaterial('sun_surface', this.scene);
		sphereMaterial.emissiveColor = new Color3(-1, 20, 10);

		this._sme.material = sphereMaterial;
		this._sme.parent = this.rootMesh;
		this._sme.position = new Vector3(0, 8, -2);
		this._addGround();

		this._addShadow();
		//shadow(this.scene, light1);
		return this.scene;
	}

	/**
	 *
	 * @param name name of the actors
	 * @param diameter Size of the sphere
	 * @param distance Distance between main sphere
	 * @param color
	 * @returns
	 */
	createActorsSecondary(
		name: string,
		diameter: number,
		distance: number,
		color: string,
		position?: { x: number; y: number; z: number }
	) {
		const offY = -1 + Math.random();
		const mesh = MeshBuilder.CreateSphere(name, { diameter, segments: 16 }, this.scene);
		mesh.parent = this._sme;
		mesh.setPivotMatrix(Matrix.Translation(distance, -2, 0), false);
		mesh.rotation = new Vector3(position?.x, position?.y, position?.z) || new Vector3();
		mesh.animations = [this.rotationAnim, this.wobbleAnim];

		if (color) {
			const _color = colorToColorBY(color);
			const sphereMaterial = new StandardMaterial(name, this.scene);
			sphereMaterial.diffuseColor = new Color3(_color.red, _color.green, _color.blue);
			mesh.material = sphereMaterial;
		}
		this._addShadow(name);
		return mesh;
	}
	private _addGround() {
		// Ground
		this._ground = MeshBuilder.CreateGround('ground', { width: 50, height: 30 }, this.scene);

		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		//groundMaterial.diffuseColor = new Color3(0, 0.17, 0.17);

		this._ground.position.y = -1;
		groundMaterial.specularColor = new Color3(0, 0, 0);
		/* 	groundMaterial.diffuseTexture = new BaseTexture();
		groundMaterial.diffuseTexture.hasAlpha = true; */

		this._ground.material = groundMaterial;
		if (!this._ground.material) {
			return;
		}

		//this._ground.position.y = -10.05;
	}

	private _addShadow(meshName: string = 'sme') {
		// Main elements
		const sme = this.scene.getMeshByName(meshName) as any;

		// Light Shadow
		const light1 = new DirectionalLight('dir01', new Vector3(1.2, -14, 1.26), this.scene);

		light1.intensity = 1;

		//Shadows
		const shadowGenerator = new ShadowGenerator(1024, light1);
		shadowGenerator?.getShadowMap()?.renderList?.push(sme);
		shadowGenerator.useBlurExponentialShadowMap = true;
		shadowGenerator.usePoissonSampling = true;

		this._ground.receiveShadows = true;
	}

	private _configText() {
		const dynamicTexture = new DynamicTexture('dynamicTexture', 512, this.scene, true);

		return dynamicTexture;
	}

	private _createAsphalt() {
		const pbr = new PBRMaterial('pbr', this.scene);
		return pbr;
	}
}
