import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectI18nComponent } from './select-i18n.component';

describe('SelectI18nComponent', () => {
	let component: SelectI18nComponent;
	let fixture: ComponentFixture<SelectI18nComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectI18nComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectI18nComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
