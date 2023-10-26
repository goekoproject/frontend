import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoResultComponent } from './sme-analysis-result.component';

describe('DemoResultComponent', () => {
	let component: DemoResultComponent;
	let fixture: ComponentFixture<DemoResultComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DemoResultComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DemoResultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
