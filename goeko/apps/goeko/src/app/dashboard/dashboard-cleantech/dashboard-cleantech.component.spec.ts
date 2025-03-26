import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { Signal, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterModule } from '@angular/router'
import { LeadCleantechService, UserService } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { DashboardCleantechComponent } from './dashboard-cleantech.component'
import { DashboardCleantechService } from './dashboard-cleantech.service'

describe('DashboardCleantechComponent', () => {
  let component: DashboardCleantechComponent
  let fixture: ComponentFixture<DashboardCleantechComponent>
  let mockDashboardCleantechService: any
  let mockLeadCleantech: { getLeadByCleantech: jest.Mock }
  let mockUserService: { userProfile: Signal<any> }

  beforeEach(async () => {
    mockUserService = {
      userProfile: signal({ id: '1' } as any),
    }
    mockLeadCleantech = {
      getLeadByCleantech: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }])),
    }
    mockDashboardCleantechService = {
      getLeads: jest.fn().mockReturnValue(of([{ id: 1, name: 'Lead 1' }])),
    }

    await TestBed.configureTestingModule({
      declarations: [DashboardCleantechComponent],
      imports: [TranslateModule.forRoot(), RouterModule.forRoot([]), ButtonModule],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: DashboardCleantechService, useValue: mockDashboardCleantechService },
        { provide: LeadCleantechService, useValue: mockLeadCleantech },
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

  // Test to check if cleantechLeads$ is populated on init
  it('should populate cleantechLeads$ on init', () => {
    component.ngOnInit()
    component.cleantechLeads$.subscribe((leads) => {
      expect(leads).toEqual([{ id: 1, name: 'Lead 1' }])
    })
  })

  // Test to check if cleantechLeads$ observable is defined
  it('should define cleantechLeads$ observable', () => {
    component.ngOnInit()
    expect(component.cleantechLeads$).toBeDefined()
  })
})
