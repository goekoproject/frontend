import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoekoButtonComponent } from './goeko-button.component';

describe('GoekoButtonComponent', () => {
	let component: GoekoButtonComponent;
	let fixture: ComponentFixture<GoekoButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GoekoButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GoekoButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
