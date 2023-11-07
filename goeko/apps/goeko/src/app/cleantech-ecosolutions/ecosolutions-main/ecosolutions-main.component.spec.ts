import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosolutionsMainComponent } from './ecosolutions-main.component';

describe('EcosolutionsMainComponent', () => {
	let component: EcosolutionsMainComponent;
	let fixture: ComponentFixture<EcosolutionsMainComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EcosolutionsMainComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EcosolutionsMainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
