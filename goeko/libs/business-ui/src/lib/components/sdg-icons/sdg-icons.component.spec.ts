import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgIconsComponent } from './sdg-icons.component';

describe('SdgIconsComponent', () => {
	let component: SdgIconsComponent;
	let fixture: ComponentFixture<SdgIconsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SdgIconsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SdgIconsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
