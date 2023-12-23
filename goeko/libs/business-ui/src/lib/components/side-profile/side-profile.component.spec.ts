import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProfileComponent } from './side-profile.component';

describe('SideProfileComponent', () => {
	let component: SideProfileComponent;
	let fixture: ComponentFixture<SideProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SideProfileComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SideProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
