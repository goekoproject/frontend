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

export class MeshActors {
	name!: string;
	diameter!: number;
	distance!: number;
	color!: string;
	segments!: number;
	imgTexture!: string;
	title!: string;
	position?: MeshActorsPosition;
	type?: string;
	constructor(data: any) {
		if (data) {
			this.name = data.name;
			this.diameter = data.diameter;
			this.distance = data.distance;
			this.color = data.color;
			this.segments = data.segments;
			this.position = data.position;
			this.title = data.title;
			this.type = data.type;
			this.imgTexture = data.imgTexture;
		}
	}
}
