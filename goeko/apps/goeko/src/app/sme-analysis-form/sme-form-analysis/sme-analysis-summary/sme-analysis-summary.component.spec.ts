import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeAnalysisSummaryComponent } from './sme-analysis-summary.component';

describe('SmeAnalysisSummaryComponent', () => {
	let component: SmeAnalysisSummaryComponent;
	let fixture: ComponentFixture<SmeAnalysisSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmeAnalysisSummaryComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmeAnalysisSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
