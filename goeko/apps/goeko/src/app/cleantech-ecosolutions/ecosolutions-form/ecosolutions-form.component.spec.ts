import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosolutionsFormComponent } from './ecosolutions-form.component';

describe('EcosolutionsFormComponent', () => {
	let component: EcosolutionsFormComponent;
	let fixture: ComponentFixture<EcosolutionsFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EcosolutionsFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EcosolutionsFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
