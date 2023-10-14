import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCircleComponent } from './loader-circle.component';

describe('LoaderCircleComponent', () => {
	let component: LoaderCircleComponent;
	let fixture: ComponentFixture<LoaderCircleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoaderCircleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoaderCircleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
