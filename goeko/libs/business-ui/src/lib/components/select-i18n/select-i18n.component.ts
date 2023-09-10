import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewChildren,
} from '@angular/core';

@Component({
	selector: 'goeko-select-i18n',
	templateUrl: './select-i18n.component.html',
	styleUrls: ['./select-i18n.component.scss'],
})
export class SelectI18nComponent implements OnInit {
	@Input() langs: any;
	@Input() defaultLang!: any;

	@Output() onSelect: EventEmitter<any> = new EventEmitter();

	public isOpen = false;
	public selectedLand: any;

	ngOnInit(): void {
		this.selectedLand = this.defaultLang;
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}

	selectedLang(lang: any) {
		this.onSelect.emit(lang);
		this.selectedLand = lang;
		this.isOpen = false;
	}
}
