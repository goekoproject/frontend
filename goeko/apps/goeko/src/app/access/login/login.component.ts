import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../access.services';
import { SignUp } from '../singup.model';
import { ERROR_TYPE } from '@goeko/core';

enum TYPE_FORM_TEMPLATE {
	true = 'login',
	false = 'signup',
}

@Component({
	selector: 'goeko-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	typeForm = true;
	formLogin!: FormGroup;
	formSignup!: FormGroup;
	public isErrorPolicyPassword!: boolean;

	constructor(private _fb: FormBuilder, private _router: Router, private _accessService: AccessService) {}

	ngOnInit(): void {
		this._createFormLogin();
		console.log(this.formSignup);
	}

	private _createFormLogin() {
		this.formLogin = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	private _createFormSignup() {
		this.formSignup = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			userType: ['', Validators.required],
		});
	}
	valueChanbgeTypeForm(typeForm: boolean) {
		// true = login, false = signup
		this.typeForm = typeForm;
		if (!typeForm) {
			this._createFormSignup();
		}
	}

	submit() {
		if (this.formLogin.valid) {
			this._accessService.login(this.formLogin.value);
			/* 			this._router.navigate(['dashboard']);
			 */
		}
	}
	submitSignUp() {
		if (this.formSignup.valid) {
			const dataSignUp = new SignUp(
				this.formSignup.value.email,
				this.formSignup.value.password,
				this.formSignup.value.userType
			);
			this._accessService.signUp(dataSignUp).subscribe(
				(res) => {
					console.log(res);
					this._router.navigate(['dashboard']);
				},
				(error) => {
					console.log(error);
					this.isErrorPolicyPassword = !!ERROR_TYPE[error.error.code as keyof typeof ERROR_TYPE];
				}
			);
		}
	}
}
