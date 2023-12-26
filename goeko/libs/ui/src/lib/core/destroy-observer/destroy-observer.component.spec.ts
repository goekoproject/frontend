import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyObserverComponent } from './destroy-observer.component';

describe('DestroyObserverComponent', () => {
	let component: DestroyObserverComponent;
	let fixture: ComponentFixture<DestroyObserverComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DestroyObserverComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DestroyObserverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
