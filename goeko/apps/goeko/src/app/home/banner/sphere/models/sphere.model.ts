import {
	ActionManager,
	Color3,
	DirectionalLight,
	ExecuteCodeAction,
	HemisphericLight,
	HighlightLayer,
	Mesh,
	MeshBuilder,
	PointLight,
	Scene,
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
	positonHemisphericLight?: MeshActorsPosition;
	positionPointLight?: MeshActorsPosition;
	positionDirectionalLight?: MeshActorsPosition;

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
	positonHemisphericLight?: MeshActorsPosition;
	positionPointLight?: MeshActorsPosition;
	positionDirectionalLight?: MeshActorsPosition;
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
		this._rawMesh.actionManager = new ActionManager(this.scene);
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
			this.positonHemisphericLight = data.positonHemisphericLight;
			this.positionPointLight = data.positionPointLight;
			this.material = data.material;
			this.type = data.type || TYPE_MESH.NONE;
			this.imgTexture = data.imgTexture;
			this.scene = scene;
			this.font = data.font || { color: 'white', fontSize: '12', text: 'text' };
			this.positionDirectionalLight = data.positionDirectionalLight;
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
			new Vector3(
				this.positonHemisphericLight?.x,
				this.positonHemisphericLight?.y,
				this.positonHemisphericLight?.z
			),
			this.scene
		);
	}

	setDirectionalLight(colorHexDiffuse?: string, colorHexSpecular?: string) {
		const name = `directional-light${this.name}`;
		const directionalLight = new DirectionalLight(
			name,
			new Vector3(
				this.positionDirectionalLight?.x,
				this.positionDirectionalLight?.y,
				this.positionDirectionalLight?.z
			),
			this.scene
		);
		this.setColorLight(directionalLight, colorHexDiffuse, colorHexSpecular);
	}
	setPointLight(colorHexDiffuse?: string, colorHexSpecular?: string) {
		const name = `point-light${this.name}`;
		const lightPoint = new PointLight(
			name,
			new Vector3(this.positionPointLight?.x, this.positionPointLight?.y, this.positionPointLight?.z),
			this.scene
		);
		this.setColorLight(lightPoint, colorHexDiffuse, colorHexSpecular);
	}

	setColorLight(light: any, colorHexDiffuse?: string, colorHexSpecular?: string) {
		if (colorHexDiffuse) {
			const _colorHexDiffuse = CustomColor.hex(colorHexDiffuse);
			light.diffuse = new Color3(_colorHexDiffuse.r, _colorHexDiffuse.g, _colorHexDiffuse.b);
		}
		if (colorHexSpecular) {
			const _colorHexSpecular = CustomColor.hex(colorHexSpecular);
			light.specular = new Color3(_colorHexSpecular.r, _colorHexSpecular.g, _colorHexSpecular.b);
		}
	}

	setShadows(colorHex: string) {
		const color = CustomColor.hex(colorHex);

		// Cree un plano
		const ground = MeshBuilder.CreateDisc('ground', { radius: 2.6, tessellation: 50 }, this.scene);
		ground.rotation.x = Math.PI / 2;

		// Aplique un material transparente al plano
		const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
		groundMaterial.alpha = 0.2;
		groundMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
		groundMaterial.emissiveColor = new Color3(color.r, color.g, color.b);
		ground.material = groundMaterial;
		ground.position.y = -5.4;
		ground.position.x = 0.5;
		ground.position.z = -10;
	}

	rotate() {
		this.sphereService.makeRotate(this._rawMesh);
	}

	onHoverActors(colorHex?: string) {
		let color: Color3;
		if (colorHex) {
			const _colorHexDiffuse = CustomColor.hex(colorHex);
			color = new Color3(_colorHexDiffuse.r, _colorHexDiffuse.g, _colorHexDiffuse.b);
		} else {
			color = Color3.White();
		}

		let highlightLayer: HighlightLayer;
		this.onHover(() => {
			highlightLayer = this.sphereService.addHightLightHover(this.rawMesh, color);
		});

		this.onBlur(() => {
			this.sphereService.removeHightLightBlur(this.rawMesh, highlightLayer);
		});
	}

	onClick(callback: any): any {
		this._rawMesh.actionManager = new ActionManager(this.scene);
		return this._rawMesh.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickTrigger, () => callback())
		);
	}

	onHover(callback: any): any {
		return this._rawMesh.actionManager?.registerAction(
			new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => callback())
		);
	}

	onBlur(callback: any): any {
		return this._rawMesh.actionManager?.registerAction(
			new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => callback())
		);
	}
}
