import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLegalComponent } from './document-legal.component';

describe('DocumentLegalComponent', () => {
	let component: DocumentLegalComponent;
	let fixture: ComponentFixture<DocumentLegalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DocumentLegalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DocumentLegalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
