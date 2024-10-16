import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Signal, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterModule } from '@angular/router'
import { LeadService, UserService } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { DashboardCleantechComponent } from './dashboard-cleantech.component'
import { DashboardCleantechService } from './dashboard-cleantech.service'

describe('DashboardCleantechComponent', () => {
  let component: DashboardCleantechComponent
  let fixture: ComponentFixture<DashboardCleantechComponent>
  let mockDashboardCleantechService: any
  let mockLeadService: { getLeadByCleantech: jest.Mock }
  let mockUserService: { userProfile: Signal<any> }

  beforeEach(async () => {
    mockUserService = {
      userProfile: signal({ id: '1' } as any),
    }
    mockLeadService = {
      getLeadByCleantech: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }])),
    }
    mockDashboardCleantechService = {
      getLeads: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }])),
    }

    await TestBed.configureTestingModule({
      declarations: [DashboardCleantechComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        { provide: DashboardCleantechService, useValue: mockDashboardCleantechService },
        { provide: LeadService, useValue: mockLeadService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardCleantechComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Prueba de inicialización ngOnInit
  it('should call getLeads on DashboardCleantechService and set cleantechLeads$', () => {
    component.ngOnInit();

    component.cleantechLeads$.subscribe((leads) => {
      expect(mockDashboardCleantechService.getLeads).toHaveBeenCalled()
      expect(leads).toEqual([{ id: 1, name: 'Lead 1' }])
    })
  })
})
