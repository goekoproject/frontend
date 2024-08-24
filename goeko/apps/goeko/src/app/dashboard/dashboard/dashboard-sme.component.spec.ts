import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideLocationMocks } from '@angular/common/testing'
import { Component, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { ProjectService, SmeRequestResponse, SmeUser, UserService } from '@goeko/store'
import { ButtonModule, DialogMessageModule, GoDateFormatPipe, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { from, of } from 'rxjs'
import { DashboardSmeComponent } from './dashboard-sme.component'

@Component({
  standalone: true,
  template: '',
})
class TestProjectComponent {}
describe('DashboardSmeComponent', () => {
  let component: DashboardSmeComponent
  let fixture: ComponentFixture<DashboardSmeComponent>
  // Mock Services
  let mockUserService: Partial<UserService>
  let mockProjectService: Partial<ProjectService>
  let mockMessageService: {
    deleteMessage: jest.Mock
  }
  //let mockRouterService: Partial<Router>
  let mockActivatedRoute: Partial<ActivatedRoute>

  let router: Router
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

    //** TODO:not suscribre */
    mockMessageService = {
      deleteMessage: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    }

    /*mockRouterService = {
      navigate: jest.fn(),
    };*/

    mockActivatedRoute = {
      parent: {
        snapshot: {
          params: {},
        },
      },
      snapshot: {
        params: {},
      },
    } as any

    await TestBed.configureTestingModule({
      declarations: [DashboardSmeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        DialogMessageModule,
        GoDateFormatPipe,

        RouterModule.forRoot([
          {
            path: '../sme-analysis/projects/project',
            component: TestProjectComponent,
          },
        ]),
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
        //{ provide: Router, useValue: mockRouterService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideLocationMocks(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardSmeComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Prueba para probar el método ngOnInit, verificar que inicializa la propiedad projects como nueva instancia de array vacío
  it('should initialize projects as an empty array on ngOnInit', () => {
    component.ngOnInit()
    expect(component.projects).toEqual([])
  })

  // Prueba para obtener el proyecto
  it('should fetch projects on initialization', () => {
    expect(mockProjectService.getRecommendationsByProjectById).toHaveBeenCalled()
    expect(component.projects.length).toBeGreaterThan(0)
  })

  //Prueba para verificar que 'projects' se inicializa correctamente con los datos del servicio.
  it('should update projects with the first 3 recommendations from the service', () => {
    const mockProject: SmeRequestResponse[] = [
      { id: '1', date: '2023-01-01', classifications: [], notification: { onNewEcosolution: true } },
      { id: '2', date: '2023-01-02', classifications: [], notification: { onNewEcosolution: false } },
      { id: '3', date: '2023-01-03', classifications: [], notification: { onNewEcosolution: true } },
    ]

    jest.spyOn(mockProjectService, 'getRecommendationsByProjectById').mockReturnValue(from(mockProject))

    component['_getLastProjectName']()
    expect(component.projects).toEqual(mockProject)
  })

  // Prueba para goToProject:
  it('should navigate to the correct project when goToProject is called', () => {
    const project: SmeRequestResponse = {
      id: '123',
      date: '2023-01-01',
      classifications: [],
      notification: { onNewEcosolution: true },
    }

    const navigateSpy = jest.spyOn(router, 'navigate')

    component.goToProject(project)

    expect(navigateSpy).toHaveBeenCalledWith(['../sme-analysis/projects/project', component.userProfile().id], {
      relativeTo: component.route.parent,
      queryParams: { projectId: project.id },
    })
  })

  it('should delete the project when deleteProject is called', () => {
    const project: SmeRequestResponse = {
      id: '123',
      date: '2023-01-01',
      classifications: [],
      notification: { onNewEcosolution: true },
    }

    mockMessageService
      .deleteMessage()
      .afterClosed()
      .subscribe((res: boolean) => {
        expect(res).toBeTruthy()
        expect(mockProjectService.deleteProject).toHaveBeenCalledWith(project.id)
        expect(mockProjectService.getRecommendationsByProjectById).toHaveBeenCalled()
      })

    component.deleteProject(project)

    expect(mockMessageService.deleteMessage).toHaveBeenCalled()
  })
})
