import { Color3 } from '@babylonjs/core';
import { MeshActor, MeshActorsPosition, MeshFont } from '../models/sphere.model';
const POSITION = new MeshActorsPosition(0, 0, 0);
const POSITION_LIGHT = new MeshActorsPosition(-10, -10, -10);
const material = {
	name: 'material_sme',
	diffuseColor: Color3.Teal(),
	specularColor: Color3.Teal(),
	emissiveColor: Color3.Teal(),
};
const font: MeshFont = {
	fontSize: 80,
	color: '#8594E8',
	text: 'SME',
};

export const SME: MeshActor = {
	name: 'sme',
	segments: 100,
	diameter: 10,
	title: 'SME',
	position: POSITION,
	positonHemisphericLight: POSITION_LIGHT,
	material: material,
	font: font,
};
