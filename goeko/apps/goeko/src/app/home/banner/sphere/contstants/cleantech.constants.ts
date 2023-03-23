import { COMMON_PARAMS } from './common-params.constants';

const POSITION = { x: 0, y: 0, z: 0 };

export const CLEANTECH = {
	name: 'CleanTeach',
	diameter: COMMON_PARAMS.DIAMETER_WRAPPER,
	distance: -16,
	color: '5B9CB3',
	segments: 16,
	position: POSITION,
};

export const CLEANTECH_INNER = {
	name: 'CleanTeach',
	diameter: COMMON_PARAMS.DIAMETER_INNER,
	title: 'CleanTech',
	distance: -16,
	color: '5B9CB3',
	segments: 16,
	position: POSITION,
	imgTexture: 'solar-panel.png',
};
