import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeAnalysisComponent } from './sme-analysis.component';

describe('SmeAnalysisComponent', () => {
	let component: SmeAnalysisComponent;
	let fixture: ComponentFixture<SmeAnalysisComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmeAnalysisComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmeAnalysisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
