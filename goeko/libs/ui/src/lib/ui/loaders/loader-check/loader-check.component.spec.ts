import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCheckComponent } from './loader-check.component';

describe('LoaderCheckComponent', () => {
	let component: LoaderCheckComponent;
	let fixture: ComponentFixture<LoaderCheckComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoaderCheckComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoaderCheckComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
