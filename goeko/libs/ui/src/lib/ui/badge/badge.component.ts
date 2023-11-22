import {
	AfterContentInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	selector: 'go-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		'(click)': 'onSelect(value)',
		'[attr.selected]': 'selected',
		'[attr.fill]': 'fill',
	},
})
export class BadgeComponent {
	@ViewChild('labelElement', { static: false }) labelElement!: ElementRef<any>;

	@Input() value!: any;
	@Input() fill!: any;

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onSelected$ = new EventEmitter();
	selected!: boolean;

	get label() {
		return this.labelElement?.nativeElement.textContent;
	}

	onSelect(value: any) {
		this.onSelected$.emit(this);
		console.log(this.label);
	}

	onSelected(selected: boolean) {
		this.selected = !selected;
	}
}
