import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'goeko-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	formLogin!: FormGroup;
	constructor(private _fb: FormBuilder, private _router: Router) {}

	ngOnInit(): void {
		this._createFormLogin();
		console.log(this.formLogin);
	}

	private _createFormLogin() {
		this.formLogin = this._fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	submit() {
		if (this.formLogin.valid) {
			this._router.navigate(['dashboard']);
		}
	}
}
