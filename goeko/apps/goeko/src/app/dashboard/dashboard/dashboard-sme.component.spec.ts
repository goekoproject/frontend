import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardSmeComponent } from './dashboard-sme.component';
import { MessageService } from '@goeko/business-ui';
import { DialogMessageService, MESSAGE_TYPE } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService, UserService, SmeRequestResponse } from '@goeko/store';
import { of } from 'rxjs';
import { ButtonModule, GoInputModule } from '@goeko/ui';
import { Classifications } from '@goeko/store';
import { NotificationSearch } from '@goeko/store';

describe('DashboardSmeComponent', () => {
	let component: DashboardSmeComponent;
	let fixture: ComponentFixture<DashboardSmeComponent>;

  // Mock Services
  let mockUserService: any;
  let mockProjectService: any;
  let mockMessageService: any;
  let mockRouterService: any;
  let route: ActivatedRoute;

	beforeEach(async () => {
    mockUserService = {
      userProfile: jest.fn().mockReturnValue({id: 1})
    };
    mockProjectService = {
      getRecomendationsByProjectById: jest.fn().mockReturnValue(of([{id: 1, name: 'Project 1'}])),
      deleteProject: jest.fn().mockReturnValue(of({}))
    };
    mockMessageService = {
      deleteMessage: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of(true)) })
    };
    mockRouterService = {
      navigate: jest.fn()
    };


		await TestBed.configureTestingModule({
      declarations: [DashboardSmeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: DialogMessageService, useValue: {} },
        { provide: RouterModule, useValue: mockRouterService},
        { provide: ActivatedRoute, useValue: { parent: {} } }

      ],
		}).compileComponents();

    route = TestBed.inject(ActivatedRoute);

		fixture = TestBed.createComponent(DashboardSmeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

  function createTestProject(): SmeRequestResponse {
    const mockClassification: Classifications = {
      mainCategory: 'Main Category Test',
      subCategory: 'Sub Category Test',
      products: ['Product 1', 'Product 2'],
    };

    const mockNotificationSearch: NotificationSearch = {
      onNewEcosolution: true,
    };

    return {
      classifications: [mockClassification],
      id: '123',
      date: '2024-08-11',
      name: 'Test Project',
      notification: mockNotificationSearch,
    };
  }

  // Prueba de creación del componente
	it('should create', () => {
		expect(component).toBeTruthy();
	})

  // Prueba de inicialización del proyecto
  it('should initialize projects as empty array', () => {
    expect(component.projects).toEqual([]);
  })

  // Prueba para obtener el proyecto
  it('should fetch projects on initialization', () => {
    expect(mockProjectService.getRecomendationsByProjectById).toHaveBeenCalledWith(1);
    component.ngOnInit();
    fixture.detectChanges(); // Necesario para actualizar la vista después de cambios asíncronos
    expect(component.projects.length).toBeGreaterThan(0);
  })

  // Prueba para navegar a los detalles del proyecto
  it('should navigate to project details', () => {
    const testProject = createTestProject();
    component.goToProject(testProject);
    expect(mockRouterService.navigate).toHaveBeenCalledWith(['../sme-analysis/projects/project', 1], {
      relativeTo: route.parent,
      queryParams: { projectId: '123' },
    })
  })

    // Prueba para borrar el proyecto
    it('should delete project', async () => {
      const testProject = createTestProject();

      await component.deleteProject(testProject);
      expect(mockMessageService.deleteMessage).toHaveBeenCalledWith(MESSAGE_TYPE.WARNING, testProject.name);
      expect(mockProjectService.deleteProject).toHaveBeenCalledWith(testProject.id);
    });
})
