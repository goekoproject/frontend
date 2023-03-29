import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	BaseTexture,
	Color3,
	Color4,
	DirectionalLight,
	DynamicTexture,
	GlowLayer,
	GroundMesh,
	Matrix,
	Mesh,
	MeshBuilder,
	PointLight,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	Texture,
	Vector3,
} from '@babylonjs/core';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Curve3, Path2 } from '@babylonjs/core/Maths/math.path';
import { Vector2 } from '@babylonjs/core/Maths/math.vector';
import { PolygonMeshBuilder } from '@babylonjs/core/Meshes/polygonMesh';
import { SolidParticleSystem } from '@babylonjs/core/Particles/solidParticleSystem';

import { colorToColorBY, CustomColor } from '@goeko/ui';
import { MeshActors } from '../sphere/models/sphere.model';
declare const MeshWriter: any;

import { SceneService } from './scenes.service';
export const FPS = 10;
export const SPEED = 0.025;
const CONTROL_CAM = true;

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

		this._addColor();

		const materialMain = this._createMaterialMain();
		this._createBorder();
		//this._createRings();
		this._sme.material = materialMain;
		//this._sme.subMeshes = subMeshes;

		this._sme.parent = this.rootMesh;
		this._sme.position = new Vector3(0, 0, 0);
		//this._sme.rotation = new Vector3(8.85, 7.15, 5.83);
		this._addGround();

		this._createSMEinner();

		//this._addShadow('sme');

		return this.scene;
	}

	private _createSMEinner() {
		const sphereInner = MeshBuilder.CreateSphere('sme_inner', { segments: 100, diameter: 10 });

		const sphereMaterial = new StandardMaterial('material_inner', this.scene);

		sphereMaterial.diffuseTexture = new BaseTexture();
		sphereMaterial.diffuseColor = Color3.Teal();
		sphereMaterial.specularColor = Color3.Teal();
		sphereMaterial.emissiveColor = CustomColor.hex('24A650');
		sphereInner.material = sphereMaterial;
		sphereInner.material.alpha = 0.3;
		// Establecer opciones de textura
		/* 	(materialMain.opacityTexture as any).uScale = 8;
		(materialMain.opacityTexture as any).vScale = 8; */
		/* 		(materialMain.opacityTexture as any).uOffset = 0.5;
		(materialMain.opacityTexture as any).vOffset = 0.5; */

		this._createGlow(sphereInner);
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
	private _createMaterialMain(img: string = 'fondo-hex2.png') {
		var light = new HemisphericLight('light_sp', new Vector3(0, 1, 0), this.scene);

		const url = `assets/${img}`;
		const imgTexture = new Texture(url, this.scene);
		const materialMain = new StandardMaterial('water1', this.scene);
		//materialMain.diffuseTexture = imgTexture;

		materialMain.opacityTexture = imgTexture;

		// Establecer opciones de textura
		(materialMain.opacityTexture as any).uScale = 2;
		(materialMain.opacityTexture as any).vScale = 2;
		(materialMain.opacityTexture as any).uOffset = 1.5;
		(materialMain.opacityTexture as any).vOffset = 1.5;
		materialMain.diffuseColor = Color3.Teal();
		//	materialMain.specularColor = Color3.White();
		materialMain.emissiveColor = Color3.Teal();
		return materialMain;
	}

	private _createRings() {
		// Creamos dos anillos luminosos azules
		var blueMaterial = new StandardMaterial('blueMaterial', this.scene);
		//blueMaterial.diffuseColor = Color3.Blue();
		blueMaterial.emissiveColor = new Color3(0, 0, 1); // Establecer el color azul brillante

		var ring1 = MeshBuilder.CreateTorus('ring1', { diameter: 25, thickness: 0.5, tessellation: 32 }, this.scene);
		blueMaterial.alpha = 0.4;
		ring1.rotation.x = -60;
		ring1.material = blueMaterial;
		/* 	var ring2 = MeshBuilder.CreateTorus('ring2', { diameter: 25, thickness: 0.5, tessellation: 32 }, this.scene);
		ring2.material = blueMaterial;
		ring2.position.x = 2.5; */

		// Creamos una animación para rotar los anillos alrededor del eje Y
		var animation = new Animation(
			'ringAnimation',
			'rotation.z',
			30,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);
		var keys = [
			{ frame: 0, value: 0 },
			{ frame: 100, value: Math.PI * 2 },
		];
		animation.setKeys(keys);
		ring1.animations.push(animation);
		/* 		ring2.animations.push(animation);
		 */
	}

	private _createBorder(mesh: Mesh = this._sme) {
		this.scene.createDefaultCameraOrLight(true, true, CONTROL_CAM);

		// Crear efecto de brillo en el borde de la esfera
		var glowLayer = new GlowLayer('glow', this.scene);
		glowLayer.intensity = 2; // Establecer intensidad
		glowLayer.addIncludedOnlyMesh(mesh);

		var light = new PointLight('light', Vector3.Zero(), this.scene);
	}

	public createArrow(el: any, scene: Scene) {
		const points = [this._sme.position, el.position];
		const line = MeshBuilder.CreateLines('line', { points: points }, scene);

		const lineMaterial = new StandardMaterial('lineMaterial', scene);
		lineMaterial.emissiveColor = new Color3(0, 0, 1);
		line.material = lineMaterial;
		return line;
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
		var plane = MeshBuilder.CreatePlane(
			'plane',
			{ width: 20, height: 10, sideOrientation: Mesh.DOUBLESIDE },
			this.scene
		);

		var planeMaterial = new StandardMaterial('material_ plane', this.scene);

		const _color = colorToColorBY('31363f');

		planeMaterial.diffuseColor = new Color3(_color.red, _color.green, _color.blue);
		//planeMaterial.specularColor = Color3.Black();
		// Crea una textura dinámica para el texto
		const textureWidth = 512;
		const textureHeight = 256;
		const dynamicTexture = new DynamicTexture(
			'dynamicTexture',
			{ width: textureWidth, height: textureHeight },
			this.scene,
			true
		);
		// Dibuja el texto creativo en la textura
		const textureContext = dynamicTexture.getContext();
		textureContext.font = 'bold 100px monospace';
		dynamicTexture.drawText('SME', null, null, '80px Trebuchet MS', '#31363F', 'transparent', true, true);
		dynamicTexture.update();

		// Crea un material y aplica la textura dinámica
		planeMaterial.diffuseTexture = dynamicTexture;
		planeMaterial.opacityTexture = dynamicTexture;
		/* planeMaterial.diffuseTexture.hasAlpha = false; */

		plane.position.x = this._sme.position.x;
		plane.position.y = this._sme.position.y;
		plane.position.z = -10;
		plane.material = planeMaterial;
		return plane;
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
	createActorsSecondary(meshActors: MeshActors) {
		return this._createMesh(meshActors);
	}

	createInsideActorSecondary(meshActors: MeshActors) {
		const diameter = meshActors.diameter;
		const segments = meshActors.segments;
		const mesh = MeshBuilder.CreateSphere(meshActors.name, { diameter, segments }, this.scene);
		mesh.parent = this._sme;
		mesh.rotation = new Vector3(-10, -10, 0);
		if (meshActors.color) {
			const _color = colorToColorBY(meshActors.color);
			const sphereMaterial = this._createMaterialMain();

			const textureWidth = 512;
			const textureHeight = 256;
			const dynamicTexture = new DynamicTexture(
				'dynamicTexture',
				{ width: textureWidth, height: textureHeight },
				this.scene,
				true
			);
			// Dibuja el texto creativo en la textura
			const textureContext = dynamicTexture.getContext();
			textureContext.font = 'bold 100px monospace';
			dynamicTexture.drawText(
				meshActors.title,
				null,
				null,
				'80px Trebuchet MS',
				'#31363F',
				'transparent',
				true,
				true
			);

			dynamicTexture.update();

			// Crea un material y aplica la textura dinámica
			//	sphereMaterial.diffuseTexture = dynamicTexture;
			sphereMaterial.opacityTexture = dynamicTexture;

			mesh.material = sphereMaterial;
		}
		//const plane = this._createPlaneOnMesh(mesh, meshActors);

		this._rotationMesh(mesh, meshActors);

		//mesh.material = this._createMaterialMain(meshActors.imgTexture);
		//this._createGlow(mesh);
		return mesh;
	}

	private _createGlow(mesh: Mesh) {
		// Crear efecto de brillo en el borde de la esfera
		var glowLayer = new GlowLayer('glow', this.scene);
		glowLayer.neutralColor = new Color4(1, 30, 0, 0);

		glowLayer.intensity = 1; // Establecer intensidad
		glowLayer.addIncludedOnlyMesh(mesh);
	}

	private _createMesh(meshActors: MeshActors) {
		const diameter = meshActors.diameter;
		const segments = meshActors.segments;
		const mesh = MeshBuilder.CreateSphere(meshActors.name, { diameter, segments }, this.scene);

		if (!mesh) {
			return;
		}

		mesh.parent = this._sme;
		mesh.setPivotMatrix(Matrix.Translation(meshActors.distance, -2, 0), false);
		this._rotationMesh(mesh, meshActors);

		if (meshActors.color) {
			const _color = colorToColorBY(meshActors.color);
			const sphereMaterial = new StandardMaterial(meshActors.name, this.scene);

			sphereMaterial.emissiveColor = new Color3(_color.red, _color.green, _color.blue);
			sphereMaterial.diffuseTexture = new BaseTexture();
			sphereMaterial.alpha = 1;
			//(sphereMaterial.diffuseTexture.hasAlpha = true;
			mesh.material = this._createMaterialMain();
			mesh.material.alpha = 0.4;
		}

		//this._addShadow(name);
		return mesh;
	}

	private _rotationMesh(meshWrapper: Mesh, meshActors: MeshActors) {
		meshWrapper.setPivotMatrix(Matrix.Translation(meshActors.distance, 0, 0), false);

		meshWrapper.rotation =
			new Vector3(meshActors.position?.x, meshActors.position?.y, meshActors.position?.z) || new Vector3();
		meshWrapper.animations = [this.rotationAnim, this.wobbleAnim];
	}

	private _createPlaneOnMesh(meshReferencePosition: Mesh, meshActors: MeshActors) {
		const plane = MeshBuilder.CreatePlane(
			'plane',
			{ width: 5, height: 5, sideOrientation: Mesh.BILLBOARDMODE_ALL },
			this.scene
		);

		const planeMaterial = new StandardMaterial('material_ plane', this.scene);
		planeMaterial.opacityTexture = new Texture(`assets/${meshActors.imgTexture}`, this.scene);
		//planeMaterial.opacityTexture.hasAlpha = true;
		plane.parent = meshReferencePosition;

		// Dibuja el texto creativo en la textura
		const textureWidth = 512;
		const textureHeight = 256;
		const dynamicTexture = new DynamicTexture(
			'dynamicTexture',
			{ width: textureWidth, height: textureHeight },
			this.scene,
			true
		);
		const textureContext = dynamicTexture.getContext();
		textureContext.font = 'bold 140px monospace';
		dynamicTexture.drawText(
			meshActors.title,
			null,
			null,
			'60px Trebuchet MS',
			'#31363F',
			'transparent',
			true,
			true
		);
		dynamicTexture.update();

		planeMaterial.diffuseTexture = dynamicTexture;
		planeMaterial.opacityTexture = dynamicTexture;
		planeMaterial.diffuseTexture.hasAlpha = false;
		plane.parent = meshReferencePosition;
		plane.position.x = meshReferencePosition.position.x;
		plane.position.y = meshReferencePosition.position.y;
		plane.position.z = meshReferencePosition.position.z;

		/* plane.position.y = -1; */
		plane.material = planeMaterial;

		return plane;
	}

	private _addGround() {
		// Ground
		this._ground = MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene);

		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		//groundMaterial.diffuseColor = new Color3(0, 0.17, 0.17);

		this._ground.position.y = -10;
		//groundMaterial.specularColor = new Color3(0, 0, 0);
		groundMaterial.diffuseTexture = new BaseTexture();
		//groundMaterial.diffuseTexture.hasAlpha = true;
		//groundMaterial.diffuseTexture = new Texture('./assets/bkg-1.png', this.scene, false);
		//groundMaterial.diffuseTexture = new Texture('assets/background-world.svg', this.scene, false);
		this._ground.material = groundMaterial;
		if (!this._ground.material) {
			return;
		}
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
