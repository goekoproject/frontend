import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { UiTabComponent } from './tab/tab.component';

@Component({
	selector: 'go-tab-group',
	templateUrl: './tab-group.component.html',
	styleUrls: ['./tab-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'go-tab-group',
	},
})
export class TabGroupComponent implements AfterContentInit {
	@ContentChildren(UiTabComponent) tabs!: QueryList<UiTabComponent>; //we find all of the tabs of the component

	tab!: TabGroupComponent;

	constructor() {}

	ngAfterContentInit(): void {
		//We show the first one and subscribe to all of them
		this.tabs.first?.showTab();
		this.tabs.forEach((tab) => {
			tab.selectedTab.subscribe((res) => {
				//when event is emmited show the tab that emitted it and hide the rest
				this.hideTabs();
				tab.showTab();
			});
		});
	}

	hideTabs() {
		this.tabs.forEach((tab) => tab.hideTab());
	}
}
