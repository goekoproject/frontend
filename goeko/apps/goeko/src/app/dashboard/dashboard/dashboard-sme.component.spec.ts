import { HttpClientTestingModule } from '@angular/common/http/testing'
import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { ProjectService, SmeRequestResponse, SmeUser, UserService } from '@goeko/store'
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

  // Prueba para probar el método ngOnInit, verificar que inicializa la propiedad projects como nueva instancia de array vacío
  it('should initialize projects as an empty array on ngOnInit', () => {
    component.ngOnInit();

    expect(component.projects).toEqual([]);
  });

  //Prueba para verificar que 'projects' se inicializa correctamente con los datos del servicio.
  it('should update projects with the first 3 recommendations from the service', () => {
    const mockProject: SmeRequestResponse[] = [
      { id: '1', date: '2023-01-01', classifications: [], notification: { onNewEcosolution: true } },
      { id: '2', date: '2023-01-02', classifications: [], notification: { onNewEcosolution: false } },
      { id: '3', date: '2023-01-03', classifications: [], notification: { onNewEcosolution: true } }
    ];

    jest.spyOn(mockProjectService, 'getRecommendationsByProjectById').mockReturnValue(of(mockProject));

    component['_getLastProjectName']();
    const [projects] = component.projects;
    expect(projects).toEqual(mockProject);
  });

  // Prueba cuando no se devuelven proyectos: ESTA PRUEBA ES POSIBLE QUE SOBRE PORQUE NO AUMENTA VALORES AL ANÁLISIS
  it('should set projects to an empty array if no recommendations are returned', () => {
    jest.spyOn(mockProjectService, 'getRecommendationsByProjectById').mockReturnValue(of([]));

    component['_getLastProjectName']();
    const [projects] = component.projects;
    expect(projects).toEqual([]);
  });

})
