import { Color3 } from '@babylonjs/core/Maths/math.color';
import { VectorColor } from '../models/vector-color.model';

export const REGEX_COLOR = new RegExp('^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');

export const colorHexToRgb = (hex: string) => {
	if (!REGEX_COLOR.test(hex)) {
		throw new TypeError(`${hex} is not a valid, it must be hexadecimal (#5B9CB3)`);
	}
	var r = parseInt(hex.substring(0, 2), 16);
	var g = parseInt(hex.substring(2, 4), 16);
	var b = parseInt(hex.substring(4, 6), 16);

	console.log(`Trasnform to RGB(${r},${g},${b})`);
	return { r, g, b };
};

export const colorToColorBY = (hex: string) => {
	const color = colorHexToRgb(hex);
	const red = parseFloat((color.r / 255).toFixed(2));
	const green = parseFloat((color.g / 255).toFixed(2));
	const blue = parseFloat((color.b / 255).toFixed(2));
	console.log(red);
	return { red, green, blue };
};

export const getVectorColor = <T>(hex: string): VectorColor<T> => {
	const color = colorToColorBY(hex);
	return new VectorColor<T>(color.red, color.green, color.blue);
};

export abstract class CustomColor {
	static hex(hex: string) {
		return colorHexToRgb(hex) as Color3;
	}
}
