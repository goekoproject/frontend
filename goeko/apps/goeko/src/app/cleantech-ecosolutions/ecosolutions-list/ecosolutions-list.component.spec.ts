import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosolutionsListComponent } from './ecosolutions-list.component';

describe('EcosolutionsListComponent', () => {
	let component: EcosolutionsListComponent;
	let fixture: ComponentFixture<EcosolutionsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EcosolutionsListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EcosolutionsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
