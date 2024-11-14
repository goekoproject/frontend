import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideLocationMocks } from '@angular/common/testing'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { EcosolutionsTaggingService, SmeService } from '@goeko/store'
import { ButtonModule, DialogMessageModule, DialogService, GoDateFormatPipe, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
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
  let mockSmeService: Partial<SmeService>
  let mockEcosolutionsTaggingService: Partial<EcosolutionsTaggingService>
  let mockMessageService: {
    deleteMessage: jest.Mock
  }
  let mockDialogService: {
    open: jest.Mock
  }
  let mockActivatedRoute: Partial<ActivatedRoute>

  let router: Router
  beforeEach(async () => {
    mockSmeService = {
      getDashboardData: jest.fn().mockReturnValue(of({ summary: {} })),
    }
    mockEcosolutionsTaggingService = {
      getEcosolutionFavourites: jest.fn().mockReturnValue(of([])),
    }

    mockMessageService = {
      deleteMessage: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    }

    mockDialogService = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of({ id: '123' })),
      }),
    }

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
        { provide: MessageService, useValue: mockMessageService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SmeService, useValue: mockSmeService },
        { provide: EcosolutionsTaggingService, useValue: mockEcosolutionsTaggingService },
        provideLocationMocks(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardSmeComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)
    fixture.componentRef.setInput('id', '1')
    fixture.detectChanges()
  })

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Test for openNewProjectDialog method
  it('should open new project dialog and navigate to project', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')
    component.openNewProjectDialog()
    expect(mockDialogService.open).toHaveBeenCalledWith(DialogNewProjectComponent)
    expect(navigateSpy).toHaveBeenCalledWith(['../project-form', '1', '123'], { relativeTo: mockActivatedRoute.parent })
  })
})
