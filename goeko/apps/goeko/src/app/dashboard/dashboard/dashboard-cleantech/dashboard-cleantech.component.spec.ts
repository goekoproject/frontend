import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardCleantechComponent } from './dashboard-cleantech.component';
import { DashboardCleantechService } from './dashboard-cleantech.service';
import { LeadResponse, LeadService } from '@goeko/store';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

class MockDashboardCleantechService {
  getLeads() {
    return of([{ id: 1, name: 'Test Lead' }]);
  }
}
describe('DashboardCleantechComponent', () => {
	let component: DashboardCleantechComponent;
	let fixture: ComponentFixture<DashboardCleantechComponent>;
  let mockDashboardCleantechService = MockDashboardCleantechService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
      declarations: [DashboardCleantechComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: DashboardCleantechService, useClass: mockDashboardCleantechService },
        LeadService,
      ],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardCleantechComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
