import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardSmeComponent } from './dashboard-sme.component';
import { MessageService } from '@goeko/business-ui';
import { DialogMessageModule, DialogMessageService, MESSAGE_TYPE } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService, UserService, SmeRequestResponse } from '@goeko/store';
import { of } from 'rxjs';
import { ButtonModule, GoInputModule } from '@goeko/ui';
import { Classifications } from '@goeko/store';
import { NotificationSearch } from '@goeko/store';
import { signal } from '@angular/core';


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
      userProfile: signal({ id: '1'})
    };
    mockProjectService = {
      getRecommendationsByProjectById: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn().mockImplementation((callbacks) => {
            callbacks.next({ id: '1', name: 'project' })
          }),
        }),
      }),
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
        DialogMessageModule,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
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


  // Prueba para obtener el proyecto
  it('should fetch projects on initialization', () => {
    fixture.detectChanges();
    mockUserService.userProfile.set('1'); // Necesario para actualizar la vista después de cambios asíncronos
    expect(mockProjectService.getRecomendationsByProjectById).toHaveBeenCalled();
    expect(component.projects.length).toBeGreaterThan(0);
  })


})
