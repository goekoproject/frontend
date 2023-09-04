import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
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
export class SelectI18nComponent {
	@Input() langs: any;
	@Input() defaultLang!: string;

	@Output() onSelect: EventEmitter<any> = new EventEmitter();

	public isOpen = false;
	public selectedLand: any;
	toggle() {
		this.isOpen = !this.isOpen;
	}

	selectedLang(lang: any) {
		this.onSelect.emit(lang);
		this.selectedLand = lang;
		this.isOpen = false;
	}
}
