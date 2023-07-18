import { SuperSelectComponent } from './../super-select/super-select.component';
import { BaseOptionComponent } from './base-option.component';
import { Component, Inject, OnInit, Optional, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { SUPER_SELECT_TOKEN } from '../super-select-token';

@Component({
  selector: 'super-option',
  templateUrl: './super-option.component.html',
  styleUrls: ['./super-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'super-option',
		role: 'option',
		'[id]': 'id',
		'[attr.tabindex]': '_getTabIndex()',
		'(click)': '_selectViaInteraction()',
		'(mouseenter)': '_onMouseenter()',
		'(mouseleave)': '_onMouseleave()',
		'(keydown)': '_handleKeydown($event)',
		'(focus)': '_Focus($event)'
	},
})
export class SuperOptionComponent  extends BaseOptionComponent implements OnInit {

  constructor(
    @Optional()
		@Inject(SUPER_SELECT_TOKEN)
		uiSelect: SuperSelectComponent,
		 _element: ElementRef,
		  _changeDetector: ChangeDetectorRef
  ) { 
    super(uiSelect,_element,_changeDetector);
  }

  ngOnInit(): void {
  }

}
