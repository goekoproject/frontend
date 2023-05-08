import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangingPageComponent } from './langing-page.component';

describe('LangingPageComponent', () => {
	let component: LangingPageComponent;
	let fixture: ComponentFixture<LangingPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LangingPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LangingPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
