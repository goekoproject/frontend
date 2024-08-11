import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardCleantechComponent } from './dashboard-cleantech.component';
import { DashboardCleantechService } from './dashboard-cleantech.service';
import { LeadService, UserService } from '@goeko/store';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
class MockDashboardCleantechService {
  getLeads() {
    return of([{ id: 1, name: 'Test Lead' }]);
  }
}
describe('DashboardCleantechComponent', () => {
	let component: DashboardCleantechComponent;
	let fixture: ComponentFixture<DashboardCleantechComponent>;
  let dashboardCleantechServiceMock: any;

	beforeEach(async () => {

    // Mock del DashboardCleantechService
    dashboardCleantechServiceMock = {
      getLeads: jest.fn().mockReturnValue(of([{ id:1, name: 'Lead 1'}]))
    };

		await TestBed.configureTestingModule({
      declarations: [DashboardCleantechComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: DashboardCleantechService, useValue: DashboardCleantechService},
        LeadService,
        UserService,
      ],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardCleantechComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

  // Prueba de creación del componente
	it('should create', () => {
		expect(component).toBeTruthy();
	});

  // Prueba de inicialización ngOnInit
  it('should call getLeads on DashboardCleantechService and set cleantechLeads$', () => {
    component.ngOnInit();

    expect(dashboardCleantechServiceMock.getLeads).toHaveBeenCalled();

    component.cleantechLeads$.subscribe((leads) => {
      expect(leads).toEqual([{ id: 1, name: 'Lead 1' }]);
    });
  });

});
