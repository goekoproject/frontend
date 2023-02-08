import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	BaseTexture,
	Color3,
	DirectionalLight,
	DynamicTexture,
	GroundMesh,
	HighlightLayer,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRMaterial,
	PointLight,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	Texture,
	Vector3,
} from '@babylonjs/core';
import { Curve3, Path2 } from '@babylonjs/core/Maths/math.path';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { PolygonMeshBuilder } from '@babylonjs/core/Meshes/polygonMesh';
import { SolidParticleSystem } from '@babylonjs/core/Particles/solidParticleSystem';

import { colorToColorBY } from '@goeko/ui';
declare const MeshWriter: any;

import { SceneService } from './scenes.service';
export const FPS = 60;
const methodsObj = {
	Vector2,
	Vector3,
	Path2,
	Curve3,
	Color3,
	SolidParticleSystem,
	PolygonMeshBuilder,
	StandardMaterial,
	Mesh,
};

@Injectable({ providedIn: 'root' })
export class SphereService extends SceneService {
	_sme!: Mesh;
	light1!: DirectionalLight;
	private _ground!: GroundMesh;

	testRotationX = 0;

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
	createSceneSME(canvas: ElementRef<HTMLCanvasElement>, size: number = 30): Scene {
		if (this.scene) {
			this.scene.dispose();
		}
		super.createScene(canvas);
		this.light = new PointLight('sun', new Vector3(1, -10, -40), this.scene);
		this.light.intensity = 0.5;
		this._sme = MeshBuilder.CreateSphere('sme', { segments: 100, diameter: size });

		const sphereMaterial = new StandardMaterial('sun_surface', this.scene);

		const sphereMaterialText = new StandardMaterial('text', this.scene);

		//Material 1
		sphereMaterial.diffuseTexture = new Texture('./assets/fondo-header.png', this.scene, false);
		sphereMaterial.alpha = 0.4;
		sphereMaterial.diffuseTexture.hasAlpha = true;

		//Material Text
		const myDynamicTexture = new DynamicTexture('dynamic texture', { width: 800, height: 800 }, this.scene);
		const font = 'bold 100px Tahoma';
		sphereMaterialText.emissiveColor = new Color3(-1, 20, 10);
		sphereMaterialText.diffuseTexture = myDynamicTexture;
		myDynamicTexture.drawText('SME', 20, 500, font, '#FFFFFF', '#048ABF', true, true);

		myDynamicTexture.update();

		this._sme.material = sphereMaterialText;

		this._sme.parent = this.rootMesh;
		this._sme.position = new Vector3(0, 0, 0);
		this._sme.rotation = new Vector3(8.85, 7.15, 5.83);
		this._addGround();
		const hl1 = new HighlightLayer('hl1', this.scene);
		const color = colorToColorBY('3b6ebc');
		hl1.addMesh(this._sme, new Color3(color.red, color.green, color.blue));
		this._addShadow();
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
		return this._createMesh(name, diameter, distance, color, position);
	}

	createInsideActorSecondary(
		name: string,
		diameter: number,
		distance: number,
		color: string,
		position?: { x: number; y: number; z: number }
	) {
		const mesh = this._createMesh(name, diameter, distance, color, position) as any;
		mesh.material.alpha = 1;
		return mesh;
	}

	private _createMesh(
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

			sphereMaterial.emissiveColor = new Color3(_color.red, _color.green, _color.blue);
			//sphereMaterial.diffuseTexture = new BaseTexture();
			sphereMaterial.alpha = 0.2;
			//(sphereMaterial.diffuseTexture.hasAlpha = true;
			mesh.material = sphereMaterial;
		}

		this._addShadow(name);
		return mesh;
	}

	private _addGround() {
		// Ground
		this._ground = MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, this.scene);

		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		groundMaterial.diffuseColor = new Color3(0, 0.17, 0.17);

		this._ground.position.y = -10;
		//groundMaterial.specularColor = new Color3(0, 0, 0);
		groundMaterial.diffuseTexture = new BaseTexture();
		groundMaterial.diffuseTexture.hasAlpha = true;
		//groundMaterial.diffuseTexture = new Texture('./assets/bkg-1.png', this.scene, false);

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
		this.light1 = new DirectionalLight('dir01', new Vector3(10, -10, 10), this.scene);

		this.light1.intensity = 0.8;

		//Shadows
		const shadowGenerator = new ShadowGenerator(1024, this.light1);
		shadowGenerator?.getShadowMap()?.renderList?.push(sme);
		shadowGenerator.useBlurExponentialShadowMap = true;
		shadowGenerator.usePoissonSampling = true;
		shadowGenerator.useOpacityTextureForTransparentShadow = true;

		this._ground.receiveShadows = true;
	}

	_addText() {
		const Writer = MeshWriter(this.scene, { scale: 0.1, methods: methodsObj });
		const text1 = new Writer('holaa', { color: '1C3870' });
		const meshText = text1.getMesh();
		meshText.rotation.x = -1.4;
		meshText.rotation.y = 8;
		meshText.rotation.z = 2;

		meshText.position = new Vector3(2, 16, -1);

		return meshText;
	}

	private _createAsphalt() {
		const pbr = new PBRMaterial('pbr', this.scene);
		return pbr;
	}
}
