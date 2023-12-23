import { Color3 } from '@babylonjs/core';
import { MeshActor, MeshActorsPosition, MeshFont } from '../models/sphere.model';
import { POSITION_DIRECTIONAL_LIGHT } from './common-params.constants';
const POSITION = new MeshActorsPosition(0, 0, 0);
const POSITION_LIGHT_HEMISPHERE = new MeshActorsPosition(-10, -10, -10);

const POSITION_LIGHT_POINT = new MeshActorsPosition(-5, 10, 0);

const material = {
	name: 'material_sme',
	diffuseColor: Color3.Teal(),
	specularColor: Color3.Teal(),
	emissiveColor: Color3.Teal(),
};
const font: MeshFont = {
	fontSize: 60,
	color: '#FFFFFF',
	text: 'sme',
};

export const SME: MeshActor = {
	name: 'sme',
	segments: 100,
	diameter: 5.5,
	title: 'sme',
	position: POSITION,

	positionDirectionalLight: POSITION_DIRECTIONAL_LIGHT,
	/* 	positionPointLight: POSITION_LIGHT_POINT,
	 */ material: material,
	font: font,
};
