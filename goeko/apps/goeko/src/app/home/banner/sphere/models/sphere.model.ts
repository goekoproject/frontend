import {
	ActionManager,
	Color3,
	DirectionalLight,
	ExecuteCodeAction,
	HemisphericLight,
	Mesh,
	MeshBuilder,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	Texture,
	Vector3,
} from '@babylonjs/core';
import { CustomColor } from '@goeko/ui';
import { SphereService } from '../../scenes/sphere.service';

export class MeshActorsPosition {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

export enum TYPE_MESH {
	ROOT_MESH = 'root_mesh',
	NONE = '',
}
export interface MeshActor {
	name: string;
	diameter: number;
	segments: number;
	title: string;
	position: MeshActorsPosition;
	positonHemisphericLight: MeshActorsPosition;
	material: any;
	type?: TYPE_MESH;
	distance?: number;
	color?: string;
	imgTexture?: string;
	font: MeshFont;
}

export interface MeshFont {
	color: string;
	fontSize: number;
	text: string;
}
export class MeshActors implements MeshActor {
	name!: string;
	diameter!: number;
	segments!: number;
	title!: string;
	position!: MeshActorsPosition;
	positonHemisphericLight!: MeshActorsPosition;
	scene!: Scene;
	type!: TYPE_MESH;
	material!: any;
	distance?: number;
	color?: string;
	imgTexture?: string;
	font!: MeshFont;
	private _rawMesh!: Mesh;
	public get rawMesh(): Mesh {
		return this._rawMesh;
	}
	public set rawMesh(value: Mesh) {
		this._rawMesh = value;
	}

	constructor(private sphereService: SphereService, scene: Scene, data: any) {
		if (data) {
			this.name = data.name;
			this.diameter = data.diameter;
			this.distance = data.distance;
			this.color = data.color;
			this.segments = data.segments;
			this.position = data.position || { x: 0, y: 0, z: 0 };
			this.title = data.title;
			this.positonHemisphericLight = data.positonHemisphericLight || { x: 0, y: 0, z: 0 };
			this.material = data.material;
			this.type = data.type || TYPE_MESH.NONE;
			this.imgTexture = data.imgTexture;
			this.scene = scene;
			this.font = data.font || { color: 'white', fontSize: '12', text: 'text' };
		}
	}

	build(text?: string) {
		if (text) {
			this._rawMesh = this.sphereService.builderSphereWithLabel(this, text);
		} else {
			this._rawMesh = this.sphereService.builderSphere(this);
		}
		this._configMaterial();
		return this;
	}

	private _configMaterial() {
		const material = new StandardMaterial(this.material.name, this.scene);
		this._rawMesh.material = material;
	}

	setDiffuseTexture(texture?: string) {
		(this._rawMesh.material as StandardMaterial).diffuseTexture = new Texture(`${texture}`, this.scene);
	}

	setEmissiveColor(colorHex: string) {
		const color = CustomColor.hex(colorHex);
		(this._rawMesh.material as StandardMaterial).emissiveColor = new Color3(color.r, color.g, color.b);
	}
	setSpecularColor(colorHex: string) {
		(this._rawMesh.material as StandardMaterial).specularColor = Color3.Teal();
	}

	setDiffuseColor(colorHex: string) {
		(this._rawMesh.material as StandardMaterial).diffuseColor = Color3.Gray();
	}
	setHemisphericLight() {
		new HemisphericLight(
			'light1',
			new Vector3(this.positonHemisphericLight.x, this.positonHemisphericLight.y, this.positonHemisphericLight.z),
			this.scene
		);
	}

	setShadows(colorHex: string) {
		const color = CustomColor.hex(colorHex);

		// Agregue una luz direccional
		const light = new DirectionalLight('light', new Vector3(-1, -2, -1), this.scene);
		light.position = new Vector3(1, 6, 9);
		light.intensity = 0.5;

		// Cree un plano
		const ground = MeshBuilder.CreateDisc('ground', { radius: 4, tessellation: 64 }, this.scene);
		ground.rotation.x = Math.PI / 2;

		// Aplique un material transparente al plano
		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		groundMaterial.alpha = 0.2;
		groundMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
		groundMaterial.emissiveColor = new Color3(color.r, color.g, color.b);
		ground.material = groundMaterial;
		ground.position.y = -6;

		// Configure la sombra
		const shadowGenerator = new ShadowGenerator(200, light);
		shadowGenerator.addShadowCaster(this._rawMesh);
		shadowGenerator.useBlurExponentialShadowMap = true;
		shadowGenerator.blurBoxOffset = 15;
		shadowGenerator.transparencyShadow = true;

		ground.receiveShadows = true;
	}

	rotate() {
		this.sphereService.makeRotate(this._rawMesh);
	}
	onClick(callback: any): any {
		this._rawMesh.actionManager = new ActionManager(this.scene);
		return this._rawMesh.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => callback())
		);
	}
}
