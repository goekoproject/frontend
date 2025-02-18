import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormArray, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { SdgIconsComponent, SelectFormLangComponent, SelectLocationsComponent } from '@goeko/business-ui'
import { EcosolutionsService } from '@goeko/store'
import { ButtonModule, GoInputModule, InputFileComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { EcosolutionsFormComponent } from './ecosolutions-form.component'

const mockFormData = {
  nameTranslations: [
    {
      label: 'dsadas',
      lang: 'fr',
    },
    {
      label: '',
      lang: 'en',
    },
  ],

  descriptionTranslations: [
    {
      label: 'dasdas',
      lang: 'fr',
    },
    {
      label: '',
      lang: 'en',
    },
  ],
  detailedDescriptionTranslations: [
    {
      label: 'dsadas',
      lang: 'fr',
    },
    {
      label: '',
      lang: 'en',
    },
  ],
  subCategory: {
    code: 'mainInternalCombustionEngine',
    label: 'Engins et véhicules',
    question: 'Principaux engins à moteur thermique utilisés par votre entreprise',
    products: [
      {
        code: 'equipmentCarrierTruck',
        label: 'Camion de transport d’équipements',
        disabled: false,
      },
      {
        code: 'materialsCarrierTruck',
        label: 'Camion de transport de matériaux',
        disabled: false,
      },
      {
        code: 'loader',
        label: 'Chargeuse',
        disabled: false,
      },
      {
        code: 'backhoe',
        label: 'Raboteuse',
        disabled: false,
      },
      {
        code: 'backhoeLoader',
        label: 'Pelle mécanique​',
        disabled: false,
      },
      {
        code: 'aerialBucketTruck',
        label: 'Camion nacelle',
        disabled: false,
      },
      {
        code: 'bulldozer',
        label: 'Bulldozer',
        disabled: false,
      },
      {
        code: 'scraper',
        label: 'Scraper',
        disabled: false,
      },
      {
        code: 'steamRoller',
        label: 'Rouleau compresseur',
        disabled: false,
      },
      {
        code: 'dumper',
        label: 'Dumper',
        disabled: false,
      },
      {
        code: 'grader',
        label: 'Niveleuse',
        disabled: false,
      },
      {
        code: 'slicer',
        label: 'Trancheuse',
        disabled: false,
      },
      {
        code: 'compressor',
        label: 'Compresseur​',
        disabled: false,
      },
      {
        code: 'vehicleFortransportingPeople​​',
        label: 'Véhicule de transport de personnes​',
        disabled: false,
      },
      {
        code: 'generator',
        label: 'Génératrice​',
        disabled: false,
      },
      {
        code: 'mechanicalPalletTruck',
        label: 'Transpalette mécanique​',
        disabled: false,
      },
    ],
    disabled: false,
  },
  products: ['equipmentCarrierTruck', 'loader', 'materialsCarrierTruck'],
  reductionPercentage: null,
  operationalCostReductionPercentage: null,
  sustainableDevelopmentGoals: null,
  price: 0,
  currency: 'EUR',
  unit: null,
  priceDescription: '',
  priceDescriptionTranslations: [
    {
      label: 'afafasas',
      lang: 'fr',
    },
    {
      label: '',
      lang: 'en',
    },
  ],
  deliverCountries: null,
  paybackPeriodYears: '',
  marketReady: false,
  guarantee: false,
  yearGuarantee: null,
  certified: false,
  approved: false,
  locations: [
    {
      country: {
        code: {
          code: 'CH',
          label: 'Suisse',
        },
        regions: [
          {
            code: null,
            label: 'FORM_LABEL.allProvinces',
            isAll: true,
          },
        ],
      },
    },
  ],
}
const mockGetEcosolutionById = {
  id: 'c445ee57-3782-4d49-b802-9664ce951547',
  solutionName: 'deprecated',
  nameTranslations: [
    {
      label: 'Hola',
      lang: 'fr',
    },
  ],
  solutionDescription: 'deprecated',
  descriptionTranslations: [
    {
      label: 'asdas',
      lang: 'fr',
    },
  ],
  detailedDescription: 'deprecated',
  detailedDescriptionTranslations: [
    {
      label: 'dasdasdsa',
      lang: 'fr',
    },
  ],
  cleantechId: 'a47982f1-f46b-41d1-b95a-f4a47512c512',
  priceDescriptionTranslations: [
    {
      label: '123213',
      lang: 'fr',
    },
  ],
  improvement: {
    reductionPercentage: {
      from: 0,
      to: 0,
    },
    operationalCostReductionPercentage: {
      from: 0,
      to: 0,
    },
  },
  /*   sustainableDevelopmentGoals: [6, 7, 9],
   */ classification: {
    mainCategory: 'co2Emission',
    subCategory: 'mainInternalCombustionEngine',
    products: [
      'equipmentCarrierTruck',
      'materialsCarrierTruck',
      'loader',
      'backhoe',
      'backhoeLoader',
      'aerialBucketTruck',
      'bulldozer',
      'scraper',
      'steamRoller',
      'dumper',
      'grader',
      'slicer',
      'compressor',
      'vehicleFortransportingPeople​​',
      'generator',
      'mechanicalPalletTruck',
    ],
  },
  paybackPeriodYears: 2,
  marketReady: false,
  guarantee: true,
  guaranteeInYears: 2,
  certified: true,
  approved: false,
  documents: [
    {
      id: 'ecosolution_documents/c445ee57-3782-4d49-b802-9664ce951547/test-file.pdf',
      name: 'test-file.pdf',
      url: 'https://res.cloudinary.com/hqsjddtpo/raw/upload/v1724310870/ecosolution_documents/c445ee57-3782-4d49-b802-9664ce951547/test-file.pdf',
    },
  ],
  /* pictures: [
    {
      id: 'ecosolution_pictures/c445ee57-3782-4d49-b802-9664ce951547/2024_Acer_OLED_default_3840x2400.jpg',
      name: '2024_Acer_OLED_default_3840x2400.jpg',
      url: 'https://res.cloudinary.com/hqsjddtpo/raw/upload/v1724310870/ecosolution_pictures/c445ee57-3782-4d49-b802-9664ce951547/2024_Acer_OLED_default_3840x2400.jpg',
    },
  ], */
  locations: [
    {
      country: {
        code: 'ES',
        regions: ['ES-AN'],
      },
    },
  ],
  creationDate: '2024-08-22T07:14:29',
}
xdescribe('EcosolutionsFormComponent', () => {
  let component: EcosolutionsFormComponent
  let fixture: ComponentFixture<EcosolutionsFormComponent>
  let cleantechEcosolutionsServiceMock: { getSubcategorySelected: jest.Mock; subCategorySelected: jest.Mock }
  let ecosolutionsServiceMock: {
    getEcosolutionsDocumentationById: jest.Mock
    uploadDocumentation: jest.Mock
    updatePicture: jest.Mock
    getEcosolutionById: jest.Mock
    updateEcosolution: jest.Mock
    createEcosolutions: jest.Mock
  }
  beforeEach(async () => {
    cleantechEcosolutionsServiceMock = {
      getSubcategorySelected: jest.fn(),
      subCategorySelected: jest.fn(),
    }
    ecosolutionsServiceMock = {
      getEcosolutionsDocumentationById: jest.fn().mockReturnValue(of({})),
      uploadDocumentation: jest.fn().mockReturnValue(of({})),
      updatePicture: jest.fn().mockReturnValue(of({})),
      getEcosolutionById: jest.fn().mockReturnValue(of(mockGetEcosolutionById)),
      updateEcosolution: jest.fn().mockReturnValue(
        of({
          ...mockGetEcosolutionById,
          nameTranslations: [
            {
              label: 'Adios',
              lang: 'fr',
            },
          ],
        }),
      ),
      createEcosolutions: jest.fn().mockReturnValue(of({ success: true })),
    }
    await TestBed.configureTestingModule({
      declarations: [EcosolutionsFormComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        ButtonModule,
        GoInputModule,
        SelectFormLangComponent,
        InputFileComponent,
        SdgIconsComponent,
        UiSuperSelectModule,
        SelectLocationsComponent,
      ],
      providers: [
        {
          provide: CleantechEcosolutionsService,
          useValue: cleantechEcosolutionsServiceMock,
        },
        {
          provide: EcosolutionsService,
          useValue: ecosolutionsServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue({ id: '123' }), // Ejemplo, ajustar según sea necesario
              },
              queryParamMap: {
                get: jest.fn().mockReturnValue({ mainCategory: 'emissionCO2' }), //
              },
              parent: {
                paramMap: {
                  get: jest.fn().mockReturnValue({ id: '123' }), // Ejemplo, ajustar según sea necesario
                },
              },
            },
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create a ecosolution with the data mandatory', () => {
    component.form.patchValue(mockFormData)
    component.saveEcosolution()
    expect(component.form.valid).toBeTruthy()
  })

  it('should edit a ecosolution with the data mandatory', () => {
    expect(component.form.value).toBeTruthy()
    expect(ecosolutionsServiceMock.getEcosolutionById).toHaveBeenCalled()
    ;(component.form.controls['nameTranslations'] as FormArray).controls[0].setValue({ label: 'Adios', lang: 'fr' })

    component.editEcosolution()
    expect(component.form.value.nameTranslations[0].label).toBe('Adios')
    expect(ecosolutionsServiceMock.updateEcosolution).toHaveBeenCalled()
  })
})
