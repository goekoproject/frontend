import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCleantechComponent } from './dashboard-cleantech.component';

describe('DashboardCleantechComponent', () => {
	let component: DashboardCleantechComponent;
	let fixture: ComponentFixture<DashboardCleantechComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DashboardCleantechComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardCleantechComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
