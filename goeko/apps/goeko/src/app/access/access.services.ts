import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from './singup.model';
import { AuthService } from '@goeko/core';

const URL_SIGNUP = 'https://soft-glitter-5713.eu.auth0.com/dbconnections/signup';

@Injectable({ providedIn: 'root' })
export class AccessService {
	constructor(private httpClient: HttpClient, private _authService: AuthService) {}

	public signUp(body: SignUp) {
		return this.httpClient.post(URL_SIGNUP, body);
	}

	public login(body: any) {
		this._authService.isLoggedIn({ username: body.email, password: body.password });
	}
}
