import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubcategoryProductComponent } from './select-subcategory-product.component';

describe('SelectSubcategoryProductComponent', () => {
	let component: SelectSubcategoryProductComponent;
	let fixture: ComponentFixture<SelectSubcategoryProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectSubcategoryProductComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectSubcategoryProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
