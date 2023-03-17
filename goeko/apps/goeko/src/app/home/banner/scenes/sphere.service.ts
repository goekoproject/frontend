import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	BaseTexture,
	Color3,
	DirectionalLight,
	DynamicTexture,
	GlowLayer,
	GroundMesh,
	IndicesArray,
	Matrix,
	Mesh,
	MeshBuilder,
	MultiMaterial,
	PointLight,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	SubMesh,
	Texture,
	Vector3,
	VertexBuffer,
} from '@babylonjs/core';
import { Curve3, Path2 } from '@babylonjs/core/Maths/math.path';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { PolygonMeshBuilder } from '@babylonjs/core/Meshes/polygonMesh';
import { SolidParticleSystem } from '@babylonjs/core/Particles/solidParticleSystem';
import { TextBlock } from '@babylonjs/gui';
import { AdvancedDynamicTexture, Container } from '@babylonjs/gui/2D';

import { colorToColorBY } from '@goeko/ui';
declare const MeshWriter: any;

import { SceneService } from './scenes.service';
export const FPS = 30;
export const SPEED = 0.035;

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
	sphereMaterialSME!: StandardMaterial;
	dynamicTexture!: DynamicTexture;
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

	configScene(canvas: ElementRef<HTMLCanvasElement>) {
		if (this.scene) {
			this.scene.dispose();
		}
		super.createScene(canvas);
	}

	/**
	 *
	 * @param canvas Element of  scene
	 * @param size Size of sphere
	 * @returns
	 */
	createSME(size: number = 30): Scene {
		this._createPointLight();
		this._sme = MeshBuilder.CreateSphere('sme', { segments: 100, diameter: size });

		this.sphereMaterialSME = new StandardMaterial('text', this.scene);

		this._addMaterialText();
		this._addColor();

		const materialMain = this._createMaterialMain();
		this._createBorder();

		this._sme.material = materialMain;
		//this._sme.subMeshes = subMeshes;

		this._sme.parent = this.rootMesh;
		this._sme.position = new Vector3(0, 0, 0);
		//this._sme.rotation = new Vector3(8.85, 7.15, 5.83);
		this._addGround();

		/* const hl1 = new HighlightLayer('hl1', this.scene);
		const color = colorToColorBY('3b6ebc');
		hl1.addMesh(this._sme, new Color3(color.red, color.green, color.blue)); */
		this._addShadow('sme');

		return this.scene;
	}

	startAnimationMaterialMain() {
		var animationScale = new Animation(
			'animationScale',
			'scaling',
			30,
			Animation.ANIMATIONTYPE_VECTOR3,
			Animation.ANIMATIONLOOPMODE_CONSTANT
		);
		var keysScale = [];
		keysScale.push({
			frame: 0,
			value: new Vector3(1, 1, 1),
		});
		keysScale.push({
			frame: 30,
			value: new Vector3(1.5, 1.5, 1.5),
		});
		keysScale.push({
			frame: 60,
			value: new Vector3(1, 1, 1),
		});
		animationScale.setKeys(keysScale);
		this._sme.animations.push(animationScale);

		var animationOpacity = new Animation(
			'animationOpacity',
			'material.alpha',
			30,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);
		var keysOpacity = [];
		keysOpacity.push({
			frame: 0,
			value: 0.5,
		});
		keysOpacity.push({
			frame: 30,
			value: 1,
		});
		keysOpacity.push({
			frame: 60,
			value: 0.5,
		});
		animationOpacity.setKeys(keysOpacity);
		this._sme?.material?.animations?.push(animationOpacity);

		// Iniciar animaciones
		this.scene.beginAnimation(this._sme, 0, 60, true);
	}

	makeRotate() {
		var animation = new Animation(
			'rotationAnimation',
			'rotation.y',
			30,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);

		// Definir los frames de la animación
		var keys = [
			{ frame: 0, value: 0 },
			{ frame: 1800, value: Math.PI * 2 },
		];
		animation.setKeys(keys);

		// Añadir la animación a la esfera
		this._sme.animations.push(animation);

		// Empezar la animación
		this.scene.beginAnimation(this._sme, 0, 1800, true);
	}
	stopRotate() {
		this.scene.stopAnimation(this._sme);
	}
	private _createMaterialMain() {
		const materialMain = new StandardMaterial('water', this.scene);
		//	materialMain.alpha = 0.4;
		materialMain.opacityTexture = new Texture('assets/fondo-hex.png', this.scene);
		materialMain.opacityTexture.hasAlpha = true;

		// Establecer opciones de textura
		(materialMain.opacityTexture as any).uScale = 8;
		(materialMain.opacityTexture as any).vScale = 8;
		(materialMain.opacityTexture as any).uOffset = 0.5;
		(materialMain.opacityTexture as any).vOffset = 0.5;

		materialMain.diffuseColor = Color3.Teal();
		materialMain.specularColor = Color3.White();
		materialMain.emissiveColor = Color3.Teal();
		return materialMain;
	}

	private _createBorder() {
		this.scene.createDefaultCameraOrLight(true, true, false);

		// Crear efecto de brillo en el borde de la esfera
		var glowLayer = new GlowLayer('glow', this.scene);
		glowLayer.intensity = 1; // Establecer intensidad
		glowLayer.addIncludedOnlyMesh(this._sme);

		var light = new PointLight('light', Vector3.Zero(), this.scene);

		/* 	var lensFlareSystem = new LensFlareSystem('lensFlareSystem', light, this.scene);
		var lensFlare = new LensFlare(0.5, 0, new Color3(1, 0, 1), 'assets/fondo-hex3.png', lensFlareSystem);

		var animation = new Animation(
			'animation',
			'size',
			30,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);
		var keys = [];
		keys.push({
			frame: 0,
			value: 0,
		});
		keys.push({
			frame: 30,
			value: 1,
		});
		keys.push({
			frame: 60,
			value: 0,
		});
		animation.setKeys(keys);
		this.scene.beginAnimation(lensFlare, 0, 60, true); */
	}

	private _createSubMesh(multiMaterial: MultiMaterial) {
		const subMeshes: SubMesh[] = [];

		const verticesCount = this._sme.getTotalVertices();
		const indices = this._sme.getIndices() as IndicesArray;
		const startIndex = 0;
		subMeshes.push(new SubMesh(0, startIndex, verticesCount, startIndex, indices.length, this._sme));

		const redIndices: number[] = [];
		const greenIndices: number[] = [];

		for (let i = 0; i < indices.length; i += 3) {
			const i0 = indices[i];
			const i1 = indices[i + 1];
			const i2 = indices[i + 2];

			const v0 = this._sme.getVerticesData(VertexBuffer.PositionKind, !!i0) as any;
			const v1 = this._sme.getVerticesData(VertexBuffer.PositionKind, !!i1) as any;
			const v2 = this._sme.getVerticesData(VertexBuffer.PositionKind, !!i2) as any;

			const c0 = v0[0] > 0 ? redIndices : greenIndices;
			const c1 = v1[0] > 0 ? redIndices : greenIndices;
			const c2 = v2[0] > 0 ? redIndices : greenIndices;

			c0.push(i0, i1, i2);
			c1.push(i0, i1, i2);
			c2.push(i0, i1, i2);
		}

		const redSubMesh = new SubMesh(1, 0, verticesCount, redIndices[0], redIndices.length, this._sme);
		const greenSubMesh = new SubMesh(2, 0, verticesCount, greenIndices[0], greenIndices.length, this._sme);

		return subMeshes;
	}

	private _createPointLight() {
		var sunLight = new DirectionalLight('sunLight', Vector3.Zero(), this.scene);
		//sunLight.diffuse = new Color3(1, 1, 1);
		/* this.light = new PointLight('sun', new Vector3(0, 1, 0), this.scene);
		this.light.intensity = 0.5; */
		/* 	var light = new HemisphericLight('hemiLight', new Vector3(-1, 1, 0), this.scene);
		light.diffuse = new Color3(0.86, 0.94, 0.92);
		light.specular = new Color3(0, 1, 0);
		light.groundColor = new Color3(0.53, 0.75, 0.53); */
	}

	private _addMaterialText() {
		this.dynamicTexture = new DynamicTexture('dynamic texture', { width: 800, height: 800 }, this.scene);
		const font = 'bold 100px Tahoma';
		this.dynamicTexture.drawText('SME', 20, 500, font, '#FFFFFF', '#048ABF', true, true);
		this.dynamicTexture.update();
	}

	createMaterialText() {
		/* 		var plane = MeshBuilder.CreatePlane('plane', { size: 1, sideOrientation: Mesh.DOUBLESIDE }, this.scene);
		 */ var material = new StandardMaterial('material_ plane', this.scene);

		/* 	plane.position = new Vector3(0, 1, 0);
		plane.rotation = new Vector3(Math.PI / 2, 0, 0);
 */
		const sme = this.scene.getMeshByName('sme') as any;

		var texture = AdvancedDynamicTexture.CreateForMesh(this._sme);
		var container = new Container();
		container.width = '100%';
		container.height = '100%';
		texture.addControl(container);

		// Crear texto
		var text = new TextBlock();
		text.text = 'SME';
		text.color = 'white';
		text.fontSize = 64;
		text.fontFamily = 'Arial';
		text.textWrapping = true;
		text.resizeToFit = true;
		text.resizeToFit = true;

		container.addControl(text);

		// Crear material para el texto
		/* 		var textMaterial = new StandardMaterial('textMaterial', this.scene);
		textMaterial.emissiveColor = Color3.Green();
		textMaterial.specularColor = Color3.Black(); */
	}

	private _addColor() {
		this.sphereMaterialSME.emissiveColor = new Color3(-1, 20, 10);
		this.sphereMaterialSME.diffuseTexture = this.dynamicTexture;
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
		this._ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene);

		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		//groundMaterial.diffuseColor = new Color3(0, 0.17, 0.17);

		this._ground.position.y = -10;
		//groundMaterial.specularColor = new Color3(0, 0, 0);
		groundMaterial.diffuseTexture = new BaseTexture();
		groundMaterial.diffuseTexture.hasAlpha = true;
		//groundMaterial.diffuseTexture = new Texture('./assets/bkg-1.png', this.scene, false);
		//groundMaterial.diffuseTexture = new Texture('assets/background-world.svg', this.scene, false);
		this._ground.material = groundMaterial;
		if (!this._ground.material) {
			return;
		}

		//this._ground.position.y = -10.05;
	}

	rotateGroud(x: number, y: number, z: number) {}

	private _addShadow(meshName: string = 'sme', haslight = true) {
		// Main elements
		const sme = this.scene.getMeshByName(meshName) as any;

		if (haslight) {
			// Light Shadow
			this.light1 = new DirectionalLight('dir01', new Vector3(10, -10, 10), this.scene);

			this.light1.intensity = 0.8;
		}

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
}
