import { HttpClientTestingModule } from '@angular/common/http/testing'
import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { ProjectService, SmeUser, UserService } from '@goeko/store'
import { ButtonModule, DialogMessageModule, GoDateFormatPipe, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { DashboardSmeComponent } from './dashboard-sme.component'

describe('DashboardSmeComponent', () => {
  let component: DashboardSmeComponent
  let fixture: ComponentFixture<DashboardSmeComponent>
  // Mock Services
  let mockUserService: Partial<UserService>
  let mockProjectService: Partial<ProjectService>
  let mockMessageService: Partial<MessageService>
  let mockRouterService: Router

  beforeEach(async () => {
    mockUserService = {
      userProfile: signal({ id: '1' } as SmeUser),
    }
    mockProjectService = {
      getRecommendationsByProjectById: jest.fn().mockReturnValue(
        of([
          {
            id: '1',
            name: 'project',
            date: new Date(),
          },
        ]),
      ),
      deleteProject: jest.fn().mockReturnValue(of({})),
    }
    mockMessageService = {
      deleteMessage: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of(true)) }),
    }

    await TestBed.configureTestingModule({
      declarations: [DashboardSmeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        RouterModule.forRoot([]),
        DialogMessageModule,
        GoDateFormatPipe,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: RouterModule, useValue: mockRouterService },
        { provide: ActivatedRoute, useValue: { parent: {} } },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardSmeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Prueba para obtener el proyecto
  it('should fetch projects on initialization', () => {
    expect(mockProjectService.getRecommendationsByProjectById).toHaveBeenCalled()
    expect(component.projects.length).toBeGreaterThan(0)
  })
})
