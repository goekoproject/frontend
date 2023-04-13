import { Color3 } from '@babylonjs/core';
import { MeshActor, MeshActorsPosition } from '../models/sphere.model';
const POSITION = new MeshActorsPosition(0, 0, 0);
const POSITION_LIGHT = new MeshActorsPosition(2, 0, -10);
const material = {
	name: 'material_sme',
	diffuseColor: Color3.Teal(),
	specularColor: Color3.Teal(),
	emissiveColor: Color3.Teal(),
};
export const SME: MeshActor = {
	name: 'sme',
	segments: 100,
	diameter: 5,
	title: 'SME',
	position: POSITION,
	positonHemisphericLight: POSITION_LIGHT,
	material: material,
};
