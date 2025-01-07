import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, provideRouter, Router, RouterModule } from '@angular/router'
import { CategoryModule, SelectSubcategoryProductComponent } from '@goeko/business-ui'
import { Category, EcosolutionsSearchService, Product, UserService } from '@goeko/store'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { CountProductsPipe } from '../count-products.pipe'
import { MOCK_GROUPING } from '../mock-grouping.constant'
import { MOCK_PROJECT } from '../mock-project.constant'
import { ProjectManagmentService } from '../project-managment.service'
import { ProjectFormComponent } from './project-form.component'

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent
  let fixture: ComponentFixture<ProjectFormComponent>
  let projectManagmentService: ProjectManagmentService
  let projectManagmentServiceMock: { updateProject: jest.Mock }
  const groupingMock = MOCK_GROUPING
  const mockProject = MOCK_PROJECT
  let router: Router

  beforeEach(async () => {
    projectManagmentServiceMock = {
      updateProject: jest.fn().mockReturnValue(of(true)),
    }

    await TestBed.configureTestingModule({
      imports: [
        ButtonModule,
        TranslateModule.forRoot(),
        CategoryModule,
        BadgeModule,
        SelectSubcategoryProductComponent,
        ReactiveFormsModule,
        CountProductsPipe,
        RouterModule,
        ProjectFormComponent,
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        UserService,
        EcosolutionsSearchService,
        { provide: ProjectManagmentService, useValue: projectManagmentServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: { snapshot: { params: { id: '123' } } },
          },
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectFormComponent)
    component = fixture.componentInstance
    projectManagmentService = TestBed.inject(ProjectManagmentService)

    fixture.componentRef.setInput('smeId', '123')
    fixture.componentRef.setInput('groupingForm', groupingMock)
    fixture.componentRef.setInput('project', mockProject)
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit()
    expect(component.form).toBeDefined()
    expect(component.categorySelected()).toEqual(component.groupingForm()[0])
  })

  it('should set data form if project exists', () => {
    expect(component.form.value).toBeDefined()
    expect(component.form.value['co2Emission']['mainInternalCombustionEngine'].length).toBeGreaterThan(0)
  })

  it('should select next category', () => {
    component.nextCategory()
    expect(component.categorySelected()?.code).toEqual(MOCK_GROUPING[1].code)
  })

  it('should select previous category', () => {
    component.categorySelected.set(MOCK_GROUPING[1] as Category)
    component.prevCategory()
    expect(component.categorySelected()).toEqual(MOCK_GROUPING[0])
  })

  it('should add product to form by co2Emission', () => {
    const categoryCode = component.categorySelected()?.code as string
    const subcategoryCode = 'mainInternalCombustionEngine'
    const newProduct = [
      {
        code: 'equipmentCarrierTruck',
        label: 'Camion de transport d’équipements',
        disabled: false,
      },
    ] as Product[]
    const codeProducts = newProduct.map((p) => p.code)
    component.addProduct(subcategoryCode, newProduct)

    projectManagmentService.updateProject('123', component.form.value).subscribe((res) => {
      console.log(res)
    })
    expect(component.form.get(categoryCode)?.get(subcategoryCode)?.value).toEqual(codeProducts)
  })

  it('should add product to form by waste', () => {
    component.categorySelected.set(MOCK_GROUPING[1])
    const categoryCode = component.categorySelected()?.code as string
    const subcategoryCode = 'mainCategoryNonInert'
    const newProduct = [
      {
        code: 'metalsAndAlloys',
        label: 'Métaux et alliages',
        disabled: false,
      },
    ] as Product[]
    const codeProducts = newProduct.map((p) => p.code)
    component.addProduct(subcategoryCode, newProduct)

    expect(component.form.get(categoryCode)?.get(subcategoryCode)?.value).toEqual(codeProducts)
  })

  it('should save projects', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')

    const service = projectManagmentServiceMock.updateProject.mockReturnValue(of(true))
    service().subscribe((res: any) => {
      expect(res).toBeTruthy()
      expect(navigateSpy).toHaveBeenCalledWith(['search', '123', '456'])
    })

    component.ngOnInit()
    const spy = jest.spyOn(projectManagmentService, 'updateProject').mockReturnValue(of(true))

    component.searchEcosolutions()
    fixture.detectChanges()
    expect(spy).toHaveBeenCalled()
  })
})
