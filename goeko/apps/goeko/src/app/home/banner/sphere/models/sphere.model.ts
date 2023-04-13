import {
	ActionManager,
	ExecuteCodeAction,
	HemisphericLight,
	Mesh,
	Scene,
	StandardMaterial,
	Texture,
	Vector3,
} from '@babylonjs/core';
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

	addDiffuseTexture(texture?: string) {
		(this._rawMesh.material as StandardMaterial).diffuseTexture = new Texture(
			'assets/texture-gray-1.png',
			this.scene
		);
	}
	addHemisphericLight() {
		new HemisphericLight(
			'light1',
			new Vector3(this.positonHemisphericLight.x, this.positonHemisphericLight.y, this.positonHemisphericLight.z),
			this.scene
		);
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
