import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFormBaseComponent } from './sme-form-base.component';

describe('SmeFormBaseComponent', () => {
	let component: SmeFormBaseComponent;
	let fixture: ComponentFixture<SmeFormBaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmeFormBaseComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmeFormBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
