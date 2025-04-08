import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideLocationMocks } from '@angular/common/testing'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { DialogNewProjectComponent } from '@goeko/business-ui'
import { SmeDashboard, SmeService, TaggingResponse } from '@goeko/store'
import { PartnerService } from '@goeko/store/partner/partner.service'
import { ButtonModule, DialogMessageModule, DialogService, GoDateFormatPipe, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { DashboardSmeComponent } from './dashboard-sme.component'

export const smeDashboardMock: SmeDashboard = {
  summary: {
    projects: 5,
    contacts: 10,
  },
}

export const taggingMock: TaggingResponse[] = [
  {
    id: '83ee4339-6a2f-408e-992e-07e998b2a48d',
    ecosolution: {
      ecosolutionId: 'e35a2b58-7781-4307-8005-4981924f76f0',
      companyDetail: {
        name: 'Mangrove',
        logo: 'https://res.cloudinary.com/hxe8fsx7p/image/upload/v1728322339/actor_documents/cleantechs/56dd18b3-c36c-4660-ae90-2506257938cb/logo/logo.png',
      },
      solutionName: 'Manglar ingles',
      description: 'Esto es ingles',
      classification: {
        mainCategory: 'co2Emission',
        subCategory: 'sustainableBuildingOperations',
        products: ['slicer', 'mechanicalPalletTruck'],
      },
      classifications: [
        {
          category: {
            code: 'co2Emission',
            label: 'CO₂ Emissions',
          },
          subcategory: {
            code: 'sustainableBuildingOperations',
            label: 'For the exploitation of buildings or sustainable mobility, this cleantech solution allows',
          },
          products: [],
        },
      ],
    },
    tag: 'favourite',
  },
  {
    id: '455e477f-1eb6-4ca9-9803-2d5b54d9d81d',
    ecosolution: {
      ecosolutionId: 'dcacef7b-2792-410c-95f7-7a60ae03de63',
      companyDetail: {
        name: 'Mangrove',
        logo: 'https://res.cloudinary.com/hxe8fsx7p/image/upload/v1728322339/actor_documents/cleantechs/56dd18b3-c36c-4660-ae90-2506257938cb/logo/logo.png',
      },
      solutionName: 'Manglar ',
      description: 'sadsadasda',
      classification: {
        mainCategory: 'co2Emission',
        subCategory: 'mainInternalCombustionEngine',
        products: ['aerialBucketTruck', 'equipmentCarrierTruck', 'materialsCarrierTruck'],
      },
      classifications: [
        {
          category: {
            code: 'co2Emission',
            label: 'CO₂ Emissions',
          },
          subcategory: {
            code: 'mainInternalCombustionEngine',
            label: 'Engines and vehicles',
          },
          products: [
            {
              code: 'equipmentCarrierTruck',
              label: 'Equipment carrier ',
            },
            {
              code: 'equipmentCarrierTruck',
              label: 'Camion de transport d’équipements',
            },
            {
              code: 'materialsCarrierTruck',
              label: 'Camion de transport de matériaux',
            },
            {
              code: 'aerialBucketTruck',
              label: 'Camion nacelle',
            },
          ],
        },
      ],
    },
    tag: 'favourite',
  },
]

@Component({
  standalone: true,
  template: '',
})
class TestProjectComponent {}

describe('DashboardSmeComponent', () => {
  let component: DashboardSmeComponent
  let fixture: ComponentFixture<DashboardSmeComponent>
  // Mock Services
  let mockPartnerService: Partial<PartnerService>
  let mockDialogService: {
    open: jest.Mock
  }
  let mockActivatedRoute: Partial<ActivatedRoute>

  let router: Router
  beforeEach(async () => {
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
    mockPartnerService = {
      partners$: of([{ title: 'test', description: 'hola', page: 'dashboard-sme', image: 'test', id: 'test' }]),
    }

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        DialogMessageModule,
        GoDateFormatPipe,
        DashboardSmeComponent,
        RouterModule.forRoot([
          {
            path: '../sme-analysis/projects/project',
            component: TestProjectComponent,
          },
        ]),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideLocationMocks(),

        SmeService,
        { provide: DialogService, useValue: mockDialogService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PartnerService, useValue: mockPartnerService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardSmeComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)
    fixture.componentRef.setInput('id', '1')
    fixture.componentRef.setInput('summary', smeDashboardMock)
    fixture.componentRef.setInput('ecosolutionFavourites', taggingMock)

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
