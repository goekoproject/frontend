import { animate, animation, keyframes, style } from '@angular/animations';
export const bounceAnimation = animation(
	animate(
		'{{ timing }}s {{ delay }}s ease-in-out',
		keyframes([
			style({ transform: 'translateY(0)', offset: 0 }),
			style({ transform: 'translateY(-20px)', offset: 0.5 }),
			style({ transform: 'translateY(0)', offset: 1 }),
		])
	),
	{ params: { timing: 0.5, delay: 0 } }
);
