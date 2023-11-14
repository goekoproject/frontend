import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Renderer2,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	selector: 'go-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabComponent implements AfterContentInit {
	@ContentChild('content') child!: ElementRef;

	@Input()
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this._title = value;
	}
	private _title = '';

	@Input()
	public get selected(): boolean {
		return this._selected;
	}
	public set selected(value: boolean) {
		this._selected = value;
		if (value) {
			this.showTab();
			this.clickTab(this.title);
			this._cdr.markForCheck();
		}
	}
	private _selected = false;

	@Output() selectedTab = new EventEmitter<string>(); //Our parent component will subscribe to this event on all tabs
	isTabSelected!: boolean; //This variable sets the styles for the tab

	constructor(private _renderer2: Renderer2, private _cdr: ChangeDetectorRef) {}

	ngAfterContentInit(): void {
		if (!this.child) {
			return;
		}
		if (this.isTabSelected) {
			return;
		}
		this._renderer2.addClass(this.child?.nativeElement, 'tab-hide');
		this._cdr.markForCheck();
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
		this._cdr.markForCheck();
	}
	//this method shows the text of a tab and changes the style of the tab
	showTab() {
		this.isTabSelected = true;

		if (!this.child) {
			return;
		}
		this._renderer2.removeClass(this.child?.nativeElement, 'tab-hide');
		this._renderer2.addClass(this.child?.nativeElement, 'tab-show');
		this._cdr.markForCheck();
	}
}
