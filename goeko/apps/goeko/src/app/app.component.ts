import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
	selector: 'goeko-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public path!: string;

	get isDemo() {
		return this.path?.includes('demo');
	}
	constructor(private router: Router, private route: ActivatedRoute) {
		this._routeChange();
	}

	private _routeChange() {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				distinctUntilChanged()
			)
			.subscribe(() => {
				this.path = (this.route.snapshot as any)['_routerState'].url;
			});
	}
}
