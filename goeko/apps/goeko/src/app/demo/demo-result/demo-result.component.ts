import { Component } from '@angular/core';
import { FORM_FIELD_DEMO } from '../demo-container/form-field-demo.constants';

@Component({
	selector: 'goeko-demo-result',
	templateUrl: './demo-result.component.html',
	styleUrls: ['./demo-result.component.scss'],
})
export class DemoResultComponent {
	formField = FORM_FIELD_DEMO;
}
