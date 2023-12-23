import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysComponent } from './category.component';

describe('CategorysComponent', () => {
	let component: CategorysComponent;
	let fixture: ComponentFixture<CategorysComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CategorysComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CategorysComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
