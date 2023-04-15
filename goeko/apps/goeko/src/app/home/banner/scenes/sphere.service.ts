import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	Axis,
	BaseTexture,
	Color3,
	DirectionalLight,
	DynamicTexture,
	GlowLayer,
	GroundMesh,
	Matrix,
	Mesh,
	MeshBuilder,
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

import { colorHexToRgb } from '@goeko/ui';
import { MeshActors, TYPE_MESH } from '../sphere/models/sphere.model';
declare const MeshWriter: any;

import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { SceneService } from './scenes.service';
export const FPS = 10;
export const SPEED = 0.025;
const CONTROL_CAM = false;

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

	getScene(canvas: ElementRef<HTMLCanvasElement>) {
		if (this.scene) {
			this.scene.dispose();
		}
		super.createScene(canvas);
		return this.scene;
	}

	public builderSphere(mesh: MeshActors): Mesh {
		const sphere = MeshBuilder.CreateSphere(mesh.name, { segments: mesh.segments, diameter: mesh.diameter });
		sphere.position = new Vector3(mesh.position.x, mesh.position.x, mesh.position.x);
		if (mesh.type === TYPE_MESH.ROOT_MESH) {
			this._setRootMesh(sphere);
		}
		return sphere;
	}

	public builderSphereWithLabel(mesh: MeshActors, text: string): Mesh {
		const sphere = MeshBuilder.CreateSphere(mesh.name, { segments: mesh.segments, diameter: mesh.diameter });
		sphere.position = new Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
		if (mesh.type === TYPE_MESH.ROOT_MESH) {
			this._setRootMesh(sphere);
		}

		this._builderLabel(text, sphere, mesh);
		return sphere;
	}

	private _builderLabel(name: string, mesh: Mesh, meshActor: MeshActors) {
		const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

		const text = new TextBlock();
		text.text = meshActor.font.text;
		text.color = meshActor.font.color;
		text.fontSize = `${meshActor.font.fontSize}px`;
		advancedTexture.addControl(text);
		text.linkWithMesh(mesh);
	}

	private _setRootMesh(mesh: Mesh, meshParent = this.rootMesh) {
		mesh.parent = meshParent;
	}

	private _createSMEinner() {
		const sphereInner = MeshBuilder.CreateSphere('sme_inner', { segments: 100, diameter: 8 });

		const sphereMaterial = new StandardMaterial('material_inner', this.scene);

		sphereMaterial.diffuseTexture = new BaseTexture();
		sphereMaterial.diffuseColor = Color3.Teal();
		sphereMaterial.specularColor = Color3.Teal();
		//sphereMaterial.emissiveColor = CustomColor.hex('24A650');
		sphereInner.material = sphereMaterial;
		//sphereInner.material.alpha = 0.3;
		// Establecer opciones de textura
		/* 	(materialMain.opacityTexture as any).uScale = 8;
		(materialMain.opacityTexture as any).vScale = 8; */
		/* 		(materialMain.opacityTexture as any).uOffset = 0.5;
		(materialMain.opacityTexture as any).vOffset = 0.5; */

		//this._createGlow(sphereInner);
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

	makeRotate(mesh = this._sme) {
		const animation = new Animation(
			'rotationSphere',
			'rotation.y',
			30,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);

		// Definir los frames de la animación
		const keyFrames = [
			{ frame: 0, value: 0 },
			{ frame: 120, value: 2 * Math.PI },
		];
		animation.setKeys(keyFrames);

		// Añadir la animación a la esfera
		mesh.animations = [animation];

		// Empezar la animación
		this.scene.beginAnimation(mesh, 0, 120, true);
	}

	createBorder(mesh: Mesh = this._sme, intensity: number, color?: string) {
		this.scene.createDefaultCameraOrLight(true, true, CONTROL_CAM);

		// Crear efecto de brillo en el borde de la esfera
		var glowLayer = new GlowLayer('glow', this.scene);
		glowLayer.intensity = intensity; // Establecer intensidad
		/* 		glowLayer.neutralColor = new Color4(1, 30, 0, 0);
		 */
		if (color) {
			this._setGlowColor(glowLayer, color);
		}
		//glowLayer.addIncludedOnlyMesh(mesh);
	}

	private _setGlowColor(glowLayer: GlowLayer, color: string) {
		const colorRGB = colorHexToRgb(color);
		glowLayer.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
			result.set(colorRGB.r, colorRGB.g, colorRGB.b, 1); // Color verde suave
		};
	}

	rotationMesh(meshWrapper: Mesh, meshActors: MeshActors) {
		if (!meshActors.distance) {
			return;
		}
		meshWrapper.setPivotMatrix(Matrix.Translation(meshActors.distance, 0, 0), false);

		meshWrapper.rotation =
			new Vector3(meshActors.position?.x, meshActors.position?.y, meshActors.position?.z) || new Vector3();
		meshWrapper.animations = [this.rotationAnim, this.wobbleAnim];
	}

	updateOrbitingSpherePosition = (meshActors: Mesh) => {
		const orbitSpeed = 0.0003; // Controla la velocidad de la órbita

		// Calcula el ángulo de rotación en base al tiempo transcurrido
		const angle = (this._engine.getDeltaTime() * orbitSpeed) % (2 * Math.PI);

		// Rota la posición de la esfera en órbita alrededor de la central
		const rotationMatrix = Matrix.RotationAxis(Axis.Y, angle);

		meshActors.position = Vector3.TransformCoordinates(meshActors.position, rotationMatrix);
		meshActors.animations = [this.rotationAnim, this.wobbleAnim];
	};

	private _createMaterialMain(img: string = 'fondo-hex2.png') {
		//	var light = new HemisphericLight('light_sp', new Vector3(0, 1, 0), this.scene);
		let dynamicTexture = new DynamicTexture('dynamicTexture', 512, this.scene, true);
		let textBlock = new TextBlock();
		textBlock.text = '¡Hola, mundo!';
		textBlock.color = 'white';
		textBlock.fontSize = 56;
		dynamicTexture.drawText('SME', null, null, 'bold 36px Arial', 'white', 'transparent', true);
		const url = `assets/${img}`;
		const imgTexture = new Texture(url, this.scene);
		const materialMain = new StandardMaterial('water1', this.scene);
		materialMain.diffuseTexture = dynamicTexture;
		//materialMain.diffuseTexture = imgTexture;

		/* 	materialMain.opacityTexture = imgTexture;

		// Establecer opciones de textura
		(materialMain.opacityTexture as any).uScale = 2;
		(materialMain.opacityTexture as any).vScale = 2;
		(materialMain.opacityTexture as any).uOffset = 1.5;
		(materialMain.opacityTexture as any).vOffset = 1.5; */
		materialMain.diffuseColor = Color3.Teal();
		materialMain.specularColor = Color3.Teal();
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

	public createArrow(el: any, scene: Scene) {
		const points = [this._sme.position, el.position];
		const line = MeshBuilder.CreateLines('line', { points: points }, scene);

		const lineMaterial = new StandardMaterial('lineMaterial', scene);
		lineMaterial.emissiveColor = new Color3(0, 0, 1);
		line.material = lineMaterial;
		return line;
	}

	addMaterialHover(mesh: Mesh) {
		var hoverMaterial = new StandardMaterial('hoverMaterial', this.scene);
		hoverMaterial.emissiveColor = new Color3(1, 1, 0);
		mesh.material = hoverMaterial;
	}

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
}
