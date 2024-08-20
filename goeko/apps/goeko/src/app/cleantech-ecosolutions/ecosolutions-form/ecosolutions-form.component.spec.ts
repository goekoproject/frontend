import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { EcosolutionsService } from '@goeko/store'
import { ButtonModule, GoInputModule, InputFileComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { EcosolutionsFormComponent } from './ecosolutions-form.component'
import { SdgIconsComponent, SelectFormLangComponent } from '@goeko/business-ui'

describe('EcosolutionsFormComponent', () => {
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
        UiSuperSelectModule
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
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
