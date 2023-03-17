import { ElementRef, Injectable, NgZone } from '@angular/core';
import {
	ArcRotateCamera,
	Color3,
	Color4,
	DynamicTexture,
	Engine,
	FreeCamera,
	Light,
	Mesh,
	MeshBuilder,
	Scene,
	SceneLoader,
	StandardMaterial,
	Vector3,
} from '@babylonjs/core';

@Injectable({ providedIn: 'root' })
export class SceneService {
	public scene!: Scene;
	light!: Light;
	protected rootMesh!: Mesh;

	private _engine!: Engine;
	private _canvas!: HTMLCanvasElement;
	_camera!: FreeCamera | ArcRotateCamera;

	constructor(private readonly _ngZone: NgZone, private document: Document) {}

	start(inZone = true) {
		if (inZone) {
			// ignore the change events from the Engine in the Angular ngZone
			this._ngZone.runOutsideAngular(() => {
				this._startTheEngine();
				// start the render loop and therefore start the Engine
			});
		} else {
			this._startTheEngine();
		}
	}

	createScene(canvas: ElementRef<HTMLCanvasElement>) {
		this._canvas = canvas.nativeElement;
		//this._canvas.style.height = '100%';
		this._canvas.style.width = '100%';
		this._engine = new Engine(this._canvas, true);

		this.scene = new Scene(this._engine);
		this.scene.clearColor = new Color4(0.76, 0.73, 0.73);
		// background transparent
		this.scene.autoClear = false;

		this.rootMesh = MeshBuilder.CreateDisc('root', { radius: 0.01 }, this.scene);
		this._configLight();
		this._configCamera();
		// generates the world x-y-z axis for better understanding
		//this._showWorldAxis(28);
		//this.createElements();
	}

	createElements(path?: string) {
		SceneLoader.ImportMeshAsync('/', 'assets/', 'esfera5.gltf', this.scene, (meshes) => {
			console.log(meshes);
		});
	}

	private _configLight() {
		//this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
	}

	private _configCamera() {
		this._camera = new ArcRotateCamera('Camera', 0, 1, 70, new Vector3(3, -8, 0), this.scene);
		this._camera.setTarget(this.rootMesh);

		// Control mouse/ scroller etcc
		this._camera.attachControl(this._canvas, false);

		this._engine.runRenderLoop(() => this.scene.render());
	}

	private _startTheEngine() {
		let freshRender = true;

		this._engine.runRenderLoop(() => {
			this.scene.render();
			if (freshRender) {
				this._engine.resize();
				freshRender = false;
			}
		});

		// Watch for browser/canvas resize events
		window.addEventListener('resize', () => {
			//	this._engine.resize();
		});
	}

	private _showWorldAxis(size: number) {
		const axisX = MeshBuilder.CreateLines(
			'axisX',
			{
				points: [
					Vector3.Zero(),
					new Vector3(size, 0, 0),
					new Vector3(size * 0.95, 0.05 * size, 0),
					new Vector3(size, 0, 0),
					new Vector3(size * 0.95, -0.05 * size, 0),
				],
			},
			this.scene
		);

		axisX.color = new Color3(1, 0, 0);
		const xChar = this._makeTextPlane('X', 'red', size / 10);
		xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

		const axisY = MeshBuilder.CreateLines(
			'axisY',
			{
				points: [
					Vector3.Zero(),
					new Vector3(0, size, 0),
					new Vector3(-0.05 * size, size * 0.95, 0),
					new Vector3(0, size, 0),
					new Vector3(0.05 * size, size * 0.95, 0),
				],
			},
			this.scene
		);

		axisY.color = new Color3(0, 1, 0);
		const yChar = this._makeTextPlane('Y', 'green', size / 10);
		yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

		const axisZ = MeshBuilder.CreateLines(
			'axisZ',
			{
				points: [
					Vector3.Zero(),
					new Vector3(0, 0, size),
					new Vector3(0, -0.05 * size, size * 0.95),
					new Vector3(0, 0, size),
					new Vector3(0, 0.05 * size, size * 0.95),
				],
			},
			this.scene
		);

		axisZ.color = new Color3(0, 0, 1);
		const zChar = this._makeTextPlane('Z', 'blue', size / 10);
		zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
	}

	private _makeTextPlane(text: string, color: string, textSize: number) {
		const dynamicTexture = new DynamicTexture('DynamicTexture', 50, this.scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
		const plane = MeshBuilder.CreatePlane('TextPlane', { size: textSize }, this.scene);
		const material = new StandardMaterial('TextPlaneMaterial', this.scene);
		material.backFaceCulling = false;
		material.specularColor = new Color3(0, 0, 0);
		material.diffuseTexture = dynamicTexture;
		plane.material = material;

		return plane;
	}
}
