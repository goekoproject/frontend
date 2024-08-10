import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardSmeComponent } from './dashboard-sme.component';
import { MessageService } from '@goeko/business-ui';
import { DialogMessageService } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService, UserService, SmeUser } from '@goeko/store';
import { SmeAnalysisService } from '../../sme-analysis-form/sme-analysis.service';
import { of, Subject } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
describe('DashboardSmeComponent', () => {
	let component: DashboardSmeComponent;
	let fixture: ComponentFixture<DashboardSmeComponent>;

  // Mock Services
  let mockUserService: Partial<UserService>;
  let mockProjectService: Partial<ProjectService>;
  let mockMessageService: Partial<MessageService>;

	beforeEach(async () => {


/*
    // Mock del Userservice, Definir userProfile
    mockUserService = {
      userProfile: mockUserProfile,
    };

    // mock del Projectservice,
    mockProjectService = {
      getRecommendationsByProjectById: jest.fn(() => of([])),
      deleteProject: jest.fn(() => of({}))
    };

    mockMessageService = {
      deleteMessage: jest.fn(() => ({ afterClosed: () => of(true) }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockActivatedRoute = {
      parent: { snapshot: { params: {} } }
    } as ActivatedRoute;*/



		await TestBed.configureTestingModule({
      declarations: [DashboardSmeComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: DialogMessageService, useValue: mockMessageService },
        SmeAnalysisService,
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                params: {},
              },
            },
          },
        },

      ],

		}).compileComponents();

		fixture = TestBed.createComponent(DashboardSmeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
