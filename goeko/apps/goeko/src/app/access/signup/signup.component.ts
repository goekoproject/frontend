import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from '@goeko/core';

const POLICY_PASSWORD = ['passwordPolicy1', 'passwordPolicy2', 'passwordPolicy3', 'passwordPolicy4'];
@Component({
	selector: 'goeko-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'signup',
	},
})
export class SignupComponent {
	@Input() formSignup!: FormGroup;
	@Input() isErrorPolicyPassword!: boolean;
	public userType = USER_TYPE;
	public policyPassword = POLICY_PASSWORD;
}
