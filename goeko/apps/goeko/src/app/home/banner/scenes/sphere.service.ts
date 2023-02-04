import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	BaseTexture,
	Color3,
	DirectionalLight,
	DynamicTexture,
	GroundMesh,
	Matrix,
	Mesh,
	MeshBuilder,
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

	override createScene(canvas: ElementRef<HTMLCanvasElement>): Scene {
		if (this.scene) {
			this.scene.dispose();
		}
		super.createScene(canvas);
		this.light = new PointLight('sun', new Vector3(1, 20, -40), this.scene);

		this._sme = MeshBuilder.CreateSphere('s1', { segments: 32, diameter: 10 });
		const sphereMaterial = new StandardMaterial('sun_surface', this.scene);
		sphereMaterial.emissiveColor = new Color3(-1, 20, 10);

		const text = this._configText();
		sphereMaterial.diffuseTexture = text;
		this._sme.material = sphereMaterial;
		this._sme.parent = this.rootMesh;
		this._sme.position = new Vector3(1, 2, 0);
		this._configGround();
		const light1 = new DirectionalLight('dir01', new Vector3(-1, -2, -1), this.scene);

		const shadow = (scene: Scene, light: DirectionalLight) => {
			const s1 = this.scene.getMeshByName('s1') as any;

			const shadowGenerator = new ShadowGenerator(1024, light);
			shadowGenerator.useExponentialShadowMap = true;
			shadowGenerator.usePoissonSampling = true;

			shadowGenerator?.getShadowMap()?.renderList?.push(s1);
			this._ground.receiveShadows = true;
		};

		shadow(this.scene, light1);
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
		return mesh;
	}
	private _configGround() {
		// Ground
		this._ground = MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, this.scene);

		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		//groundMaterial.diffuseColor = Color3.Yellow();

		//groundMaterial.specularColor = new Color3(0, 0, 0);
		groundMaterial.diffuseTexture = new BaseTexture();
		groundMaterial.diffuseTexture.hasAlpha = true;

		this._ground.material = groundMaterial;
		if (!this._ground.material) {
			return;
		}

		//this._ground.position.y = -10.05;
	}

	private _shadow() {
		const s1 = this.scene.getMeshByName('s1');

		// Light Shadow
		const light1 = new DirectionalLight('dir01', new Vector3(-1, -2, -1), this.scene);
		const light2 = new PointLight('light2', new Vector3(0, 1, -1), this.scene);

		light1.position = new Vector3(20, 40, 20);
		light1.intensity = 0.5;

		//Shadows
		/* const shadowGenerator = new ShadowGenerator(1024, light1);
		shadowGenerator?.getShadowMap()?.renderList?.push(s1);
		shadowGenerator.useBlurExponentialShadowMap = true;
		shadowGenerator.usePoissonSampling = true; */
	}

	private _configText() {
		const dynamicTexture = new DynamicTexture('dynamicTexture', 512, this.scene, true);
		const context = dynamicTexture.getContext();
		context.font = '30px Arial';
		context.fillText('Hello World!', 100, 200);
		dynamicTexture.update();
		return dynamicTexture;
	}
}
