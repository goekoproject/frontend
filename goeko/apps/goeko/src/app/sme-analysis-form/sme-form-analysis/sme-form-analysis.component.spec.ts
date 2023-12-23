import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFormAnalysisComponent } from './sme-form-analysis.component';

describe('SmeFormAnalysisComponent', () => {
	let component: SmeFormAnalysisComponent;
	let fixture: ComponentFixture<SmeFormAnalysisComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmeFormAnalysisComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmeFormAnalysisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
