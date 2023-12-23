import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone } from '@angular/core';
import {
	Animation,
	Axis,
	Color3,
	GlowLayer,
	HighlightLayer,
	Matrix,
	Mesh,
	MeshBuilder,
	StandardMaterial,
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

export enum DIRECTION_ANGLE {
	RIGHT = +1,
	LEFT = -1,
}

@Injectable({ providedIn: 'root' })
export class SphereService extends SceneService {
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
		sphere.rotation = new Vector3(0.1, 1.2, 8.3);
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

	makeRotate(mesh: Mesh) {
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

	createBorder(mesh: Mesh, intensity: number, color?: string) {
		this.scene.createDefaultCamera(true, false, CONTROL_CAM);

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

	updateOrbitingSpherePosition = (meshActors: Mesh, drl = DIRECTION_ANGLE.RIGHT) => {
		const orbitSpeed = 0.0001; // Controla la velocidad de la órbita

		// Calcula el ángulo de rotación en base al tiempo transcurrido
		const rawAngle = (this._engine.getDeltaTime() * orbitSpeed) % (2 * Math.PI);
		const directionAngle = drl * rawAngle;
		// Rota la posición de la esfera en órbita alrededor de la central
		const rotationMatrix = Matrix.RotationAxis(Axis.Y, directionAngle);

		meshActors.position = Vector3.TransformCoordinates(meshActors.position, rotationMatrix);
		meshActors.animations = [this.rotationAnim, this.wobbleAnim];
	};

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

	addHightLightHover(mesh: Mesh, color?: Color3) {
		var highlightLayer = new HighlightLayer('highlightLayer', this.scene);
		highlightLayer.addMesh(mesh, Color3.White());
		return highlightLayer;
	}

	removeHightLightBlur(mesh: Mesh, highlightLayer: HighlightLayer) {
		highlightLayer?.removeMesh(mesh); // Quita el borde iluminado al dejar de estar el ratón encima
	}
}
