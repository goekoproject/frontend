import { Color3 } from '@babylonjs/core';
import { MeshActor, MeshActorsPosition, MeshFont } from '../models/sphere.model';
import { COMMON_PARAMS } from './common-params.constants';

export const CLEANTECH_PROP = {
	emissiveColor: '#b55dc0',
};

const POSITION = { x: 8, y: 5, z: 0 };
const POSITION_LIGHT = new MeshActorsPosition(2, 0, -10);
const material = {
	name: 'material_sme',
	diffuseColor: Color3.Teal(),
	specularColor: Color3.Teal(),
	emissiveColor: Color3.Teal(),
};

const font: MeshFont = {
	fontSize: 20,
	color: '#8594E8',
	text: 'CleanTech',
};

export const CLEANTECH: MeshActor = {
	name: 'cleantech',
	segments: 100,
	diameter: 5,
	title: 'CleanTech',
	position: POSITION,
	positonHemisphericLight: POSITION_LIGHT,
	material: material,
	distance: COMMON_PARAMS.DISTANCE,
	font: font,
};
