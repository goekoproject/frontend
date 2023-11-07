import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	selector: 'go-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class UiTabComponent implements AfterContentInit {
	@ContentChild('div') child!: ElementRef;

	@Input()
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
	private _title = '';

	@Output() selectedTab = new EventEmitter<string>(); //Our parent component will subscribe to this event on all tabs
	isTabSelected = false; //This variable sets the styles for the tab

	constructor(private _renderer2: Renderer2) {}

	ngAfterContentInit(): void {
		if (!this.child) {
			return;
		}
		this._renderer2.addClass(this.child?.nativeElement, 'tab-hide');
	}

	clickTab(event: any) {
		this.selectedTab.emit(event); //When clicking a tab we emit
	}

	//this method hides the text of a tab and changes the style of the tab
	hideTab() {
		this.isTabSelected = false;
		if (!this.child) {
			return;
		}
		this._renderer2.removeClass(this.child.nativeElement, 'tab-show');
		this._renderer2.addClass(this.child.nativeElement, 'tab-hide');
	}
	//this method shows the text of a tab and changes the style of the tab
	showTab() {
		this.isTabSelected = true;

		if (!this.child) {
			return;
		}
		this._renderer2.removeClass(this.child?.nativeElement, 'tab-hide');
		this._renderer2.addClass(this.child?.nativeElement, 'tab-show');
	}
}
