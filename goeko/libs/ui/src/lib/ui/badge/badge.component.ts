import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	HostBinding,
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
export class BadgeComponent implements AfterContentInit {
	@ViewChild('labelElement', { static: false }) labelElement!: ElementRef<any>;

	@Input() value!: any;
	@Input() fill!: any;

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onSelected$ = new EventEmitter();
	selected!: boolean;

	get label() {
		return this.labelElement?.nativeElement.textContent;
	}
	ngAfterContentInit(): void {
		console.log(this.label);
	}
	onSelect(value: any) {
		this.onSelected$.emit(this);
		console.log(this.label);
	}

	onSelected(selected: boolean) {
		this.selected = !selected;
	}
}
