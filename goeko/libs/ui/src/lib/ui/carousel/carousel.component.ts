import { trigger, state, style, transition, animate } from '@angular/animations';
import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList,
	TemplateRef,
	ViewEncapsulation,
} from '@angular/core';

import { Directive } from '@angular/core';
enum ANIMATION_CAROUSEL_STATE {
	NEXT = 'next',
	PREV = 'prev',
}
@Directive({ selector: '[goSlide]' })
export class GoSlideDirective {
	constructor(public template: TemplateRef<any>) {}
}
@Component({
	selector: 'go-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('fadeIn', [
			transition('* => next', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
			transition('* => prev', [animate('500ms', style({ opacity: 0 }))]),
		]),
	],
	host: {
		class: 'go-carousel',
	},
})
export class CarouselComponent implements AfterContentInit {
	@ContentChildren(GoSlideDirective, { descendants: true }) slide!: QueryList<any>;

	@Output() valueChangeButton = new EventEmitter();
	@Input() hiddenButton = false;
	public selectedSlideIndex: number = 0;
	public selectedSlideTemplateRef!: TemplateRef<any> | null;
	public animateStateSlide = '';
	public disabledButtonNext = false;
	public disabledButtonPrev = true;
	constructor() {}
	ngAfterContentInit(): void {
		this.selectedSlideTemplateRef = this.slide.first?.template;
		console.log(this.slide);
	}
	next() {
		if (this.disabledButtonNext) {
			return;
		}
		this.selectedSlideTemplateRef = null;
		this.selectedSlideIndex += 1;
		this.selectedSlideTemplateRef = this.slide.toArray().at(this.selectedSlideIndex)?.template;
		this.animateStateSlide = 'next';
		this._handlerArrowButton(ANIMATION_CAROUSEL_STATE.NEXT);
	}

	prev() {
		if (this.disabledButtonPrev) {
			return;
		}
		this.selectedSlideTemplateRef = null;
		this.selectedSlideIndex -= 1;
		this.selectedSlideTemplateRef = this.slide.toArray().at(this.selectedSlideIndex)?.template;
		this.animateStateSlide = 'prev';
		this._handlerArrowButton(ANIMATION_CAROUSEL_STATE.PREV);
	}

	private _handlerArrowButton(animateStateSlide: ANIMATION_CAROUSEL_STATE) {
		this.animateStateSlide = animateStateSlide;
		this.disabledButtonNext = this.selectedSlideIndex >= this.slide.length - 1;
		this.disabledButtonPrev = this.selectedSlideIndex <= 0;
		this.valueChangeButton.emit({ typeButton: animateStateSlide, index: this.selectedSlideIndex });
	}
}
