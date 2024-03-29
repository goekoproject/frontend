import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition('* => next', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('* => prev', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    class: 'go-carousel',
  },
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(GoSlideDirective, { descendants: true })
  slides!: QueryList<any>;

  @Output() valueChangeButton = new EventEmitter();
  @Input() hiddenButton = false;
  @Input() hiddenButtonPrev = false;
  @Input() hiddenButtonNext = false;

  @Input() disabledButtonNext = false;

  @Input()
  get selectedSlideIndex(): number {
    return this._selectedSlideIndex;
  }

  set selectedSlideIndex(index: number) {
    this._selectedSlideIndex = index;
    setTimeout(() => {
      if (index === undefined || !this.slides) {
        return;
      }
      this.selectedSlideTemplateRef = null;
      this.selectedSlideTemplateRef =
        this.slides.toArray()[this.selectedSlideIndex]?.template;
      this.animateStateSlide = '';
      this._handlerArrowButton(ANIMATION_CAROUSEL_STATE.NEXT);
      this._cdf.markForCheck();
    });
  }

  public selectedSlideTemplateRef!: TemplateRef<any> | null;

  private _selectedSlideIndex = 0;
  public animateStateSlide = '';
  public disabledButtonPrev = true;

  get isLastSlide() {
    return this.selectedSlideIndex + 1 === this.slides.length;
  }
  constructor(private _cdf: ChangeDetectorRef) {}
  ngAfterContentInit(): void {
    this.selectedSlideTemplateRef = this.slides.first?.template;
    this._cdf.markForCheck();
  }
  next() {
    if (this.disabledButtonNext) {
      return;
    }
    this.selectedSlideIndex = this.selectedSlideIndex + 1;
    /* 		this.selectedSlideTemplateRef = this.slides.toArray().at(this.selectedSlideIndex)?.template;
     */ this.animateStateSlide = 'next';
    this._handlerArrowButton(ANIMATION_CAROUSEL_STATE.NEXT);
    this._cdf.markForCheck();
  }

  prev() {
    if (this.disabledButtonPrev) {
      return;
    }
    this.selectedSlideIndex -= 1;
    /* 		this.selectedSlideTemplateRef = this.slides.toArray().at(this.selectedSlideIndex)?.template;
     */ this.animateStateSlide = 'prev';
    this._handlerArrowButton(ANIMATION_CAROUSEL_STATE.PREV);
    this._cdf.markForCheck();
  }

  private _handlerArrowButton(animateStateSlide: ANIMATION_CAROUSEL_STATE) {
    this.animateStateSlide = animateStateSlide;
    this.disabledButtonNext = this.selectedSlideIndex >= this.slides.length - 1;
    this.disabledButtonPrev = this.selectedSlideIndex <= 0;
    this.valueChangeButton.emit({
      typeButton: animateStateSlide,
      index: this.selectedSlideIndex,
    });
  }
}
