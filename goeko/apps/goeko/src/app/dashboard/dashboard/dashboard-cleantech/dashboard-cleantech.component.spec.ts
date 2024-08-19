import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardCleantechComponent } from './dashboard-cleantech.component';
import { DashboardCleantechService } from './dashboard-cleantech.service';
import { LeadService, UserService } from '@goeko/store';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('DashboardCleantechComponent', () => {
	let component: DashboardCleantechComponent;
	let fixture: ComponentFixture<DashboardCleantechComponent>;
  let mockDashboardCleantechService: any;
  let mockLeadService: any;
  let mockUserService: any;

	beforeEach(async () => {

   mockUserService = {
      userProfile: jest.fn().mockReturnValue({ id: 'Cleantech123' })
    };
    mockLeadService = {
      getLeadByCleantech: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }]))
    };
    mockDashboardCleantechService = {
      getLeads: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }]))
    }




		await TestBed.configureTestingModule({
      declarations: [DashboardCleantechComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: DashboardCleantechService, useValue: mockDashboardCleantechService },
        { provide: LeadService, useValue: mockLeadService },
        { provide: UserService, useValue: mockUserService }
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

    expect(mockDashboardCleantechService.getLeads).toHaveBeenCalled();

    component.cleantechLeads$.subscribe((leads) => {
      expect(leads).toEqual([{ id: 1, name: 'Lead 1' }]);
    });
  });

});
