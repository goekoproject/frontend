import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ComponentFixture,TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from '@goeko/business-ui';
import { MESSAGE_TYPE, MessageType } from '@goeko/ui';
import { ProjectService, SmeRequestResponse, SmeUser, UserService } from '@goeko/store';
import { ButtonModule, DialogMessageModule, GoDateFormatPipe, GoInputModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { from, of, Subject } from 'rxjs';
import { DashboardSmeComponent } from './dashboard-sme.component';

describe('DashboardSmeComponent', () => {
  let component: DashboardSmeComponent
  let fixture: ComponentFixture<DashboardSmeComponent>
  // Mock Services
  let mockUserService: Partial<UserService>
  let mockProjectService: Partial<ProjectService>
  let mockMessageService: MessageService
  //let mockRouterService: Partial<Router>
  let mockActivatedRoute: Partial<ActivatedRoute>

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
      deleteMessage: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    } as any;

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
    } as any;


    await TestBed.configureTestingModule({
      declarations: [DashboardSmeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        DialogMessageModule,
        GoDateFormatPipe,
        //RouterModule.forRoot([]),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
        //{ provide: Router, useValue: mockRouterService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
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

  // Prueba para probar el método ngOnInit, verificar que inicializa la propiedad projects como nueva instancia de array vacío
  it('should initialize projects as an empty array on ngOnInit', () => {
    component.ngOnInit();
    expect(component.projects).toEqual([]);
  });

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
      { id: '3', date: '2023-01-03', classifications: [], notification: { onNewEcosolution: true } }
    ];

    jest.spyOn(mockProjectService, 'getRecommendationsByProjectById').mockReturnValue(from(mockProject));

    component['_getLastProjectName']();
    expect(component.projects).toEqual(mockProject);
  });

  // Prueba para goToProject:
  it('should navigate to the correct project when goToProject is called', () => {
    const project: SmeRequestResponse = {
      id: '123',
      date: '2023-01-01',
      classifications: [],
      notification: { onNewEcosolution: true },
    };

    const navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigate');

    component.goToProject(project);

    expect(navigateSpy).toHaveBeenCalledWith(
      ['../sme-analysis/projects/project', component.userProfile().id],
      {
        relativeTo: component.route.parent,
        queryParams: { projectId: project.id },
      }
    );
  });

})
