import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { bounceAnimation } from './bounce.animation';

@Component({
	selector: 'go-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	animations: [
		trigger('bounce', [
			transition('* => *', [useAnimation(bounceAnimation, { params: { timing: 0.5, delay: 0 } })]),
		]),
		trigger('hover', [
			state('default', style({ opacity: 1 })),
			state('hovered', style({ opacity: 0.5 })),
			transition('default <=> hovered', [animate(300)]),
		]),
	],
})
export class TooltipComponent {
	bounceState = false;
	@HostBinding('@hover') hoverState = 'default';
	state = 'bounce';

	onMouseEnter() {
		this.hoverState = 'hovered';
	}

	onMouseLeave() {
		this.hoverState = 'default';
	}

	onAnimationDone() {
		this.bounceState = !this.bounceState;
	}
}
