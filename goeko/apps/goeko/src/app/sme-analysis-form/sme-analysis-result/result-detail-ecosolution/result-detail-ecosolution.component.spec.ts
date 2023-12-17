import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDetailEcosolutionComponent } from './result-detail-ecosolution.component';

describe('ResultDetailEcosolutionComponent', () => {
	let component: ResultDetailEcosolutionComponent;
	let fixture: ComponentFixture<ResultDetailEcosolutionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ResultDetailEcosolutionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ResultDetailEcosolutionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
