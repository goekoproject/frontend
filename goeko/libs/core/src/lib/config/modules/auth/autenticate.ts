import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'goeko-autenticate',
	template: ``,
})
export class AutenticateComponent implements OnInit {
	constructor(private _authService: AuthService, private _router: Router) {}
	ngOnInit(): void {
		if (location.hash) {
			this._authService.handlerAuthtentication(location.hash).subscribe({
				next: (result) => {
					if (result) {
						this._router.navigate(['dashboard']);
					}
				},
				complete: () => console.log('Completado'),
			});
		}
	}
}
