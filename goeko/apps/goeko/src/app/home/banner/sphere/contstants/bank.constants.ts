import { COMMON_PARAMS } from './common-params.constants';

export const BANK = {
	name: 'Bank',
	diameter: COMMON_PARAMS.DIAMETER_WRAPPER,
	distance: COMMON_PARAMS.DISTANCE,
	color: '3b6ebc',
	segments: 16,
	position: { x: 0, y: 0, z: 0 },
};

export const BANK_INNER = {
	name: 'Bank',
	diameter: COMMON_PARAMS.DIAMETER_INNER,
	distance: COMMON_PARAMS.DISTANCE,
	color: '3b6ebc',
	segments: 16,
	position: { x: 0, y: 0, z: 0 },
	type: 'plane',
	imgTexture: 'solar-panel.png',
	title: 'Bank',
};
