import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-select-checkbox',
	template: '',
	styleUrls: ['./select-checkbox.scss'],
	host: {
		class: 'select-checkmark',
		'[attr.checked]': 'state === "checked"',
		'[attr.disabled]': 'disabled',
	},
})
export class SelectCheckboxComponent implements OnInit {
	/** Display state of the checkbox. */
	@Input() state = 'unchecked';

	/** Whether the checkbox is disabled. */
	@Input() disabled: boolean = false;
	constructor() {}

	ngOnInit() {}
}
