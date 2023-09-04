import { Color3 } from '@babylonjs/core';
import { MeshActor, MeshActorsPosition, MeshFont } from '../models/sphere.model';
import { COMMON_PARAMS, POSITION_DIRECTIONAL_LIGHT } from './common-params.constants';

export const BANK_PROP = {
	emissiveColor: '#096bfd',
};
const POSITION = { x: -COMMON_PARAMS.DISTANCE, y: 3.5, z: 0 };
const POSITION_LIGHT_POINT = new MeshActorsPosition(-5, 10, 0);

const material = {
	name: 'material_sme',
	diffuseColor: Color3.Teal(),
	specularColor: Color3.Teal(),
	emissiveColor: Color3.Teal(),
};

const font: MeshFont = {
	fontSize: 16,
	color: '#ffffff',
	text: 'bank',
};

export const BANK: MeshActor = {
	name: 'cleantech',
	segments: 100,
	diameter: 2,
	title: 'Bank',
	position: POSITION,
	positionDirectionalLight: POSITION_DIRECTIONAL_LIGHT,
	material: material,
	distance: COMMON_PARAMS.DISTANCE,
	font: font,
};
