import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosolutionListComponent } from './ecosolution-list.component';

describe('EcosolutionListComponent', () => {
	let component: EcosolutionListComponent;
	let fixture: ComponentFixture<EcosolutionListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EcosolutionListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EcosolutionListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
