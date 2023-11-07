import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcosolutionsComponent } from './card-ecosolutions.component';

describe('CardEcosolutionsComponent', () => {
	let component: CardEcosolutionsComponent;
	let fixture: ComponentFixture<CardEcosolutionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardEcosolutionsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardEcosolutionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
