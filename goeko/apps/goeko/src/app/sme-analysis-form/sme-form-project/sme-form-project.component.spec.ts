import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFormProjectComponent } from './sme-form-project.component';

describe('SmeFormProjectComponent', () => {
	let component: SmeFormProjectComponent;
	let fixture: ComponentFixture<SmeFormProjectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmeFormProjectComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmeFormProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
