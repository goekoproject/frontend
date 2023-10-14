import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoaderCircleComponent } from './loader-animation/loader-circle/loader-circle.component';

@Component({
	standalone: true,
	imports: [LoaderCircleComponent],
	selector: 'goeko-autenticate',
	templateUrl: './autenticate.html',
	styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
	constructor(private _authService: AuthService, private _router: Router) {}
	ngOnInit(): void {
		if (location.hash) {
			this._authService.handlerAuthtentication(location.hash).subscribe({
				next: (result) => {
					if (result) {
						setTimeout(() => this._router.navigate(['dashboard']), 1000);
					}
				},
				complete: () => console.log('Completado'),
			});
		}
	}
}
