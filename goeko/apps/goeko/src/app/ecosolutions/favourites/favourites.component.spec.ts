import { provideHttpClient } from '@angular/common/http'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router, RouterModule } from '@angular/router'
import { EcosolutionsTaggingService, TaggingEnum, TaggingResponse } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { FavouritesComponent } from './favourites.component'

const mockFavorite = [
  {
    ecosolution: {
      solutionName: 'Solution 1',
      description: 'Description 1',
      companyDetail: { logo: 'logo1.png' },
      classification: { mainCategory: 'Category1' },
    },
    tag: 'FAVOURITES',
    id: 'eco1',
  },
  {
    ecosolution: {
      solutionName: 'Solution 2',
      description: 'Description 2',
      companyDetail: { logo: 'logo2.png' },
      classification: { mainCategory: 'Category2' },
    },
    tag: 'FAVOURITES',
    id: 'eco2',
  },
] as TaggingResponse[]

describe('FavouritesComponent', () => {
  let component: FavouritesComponent
  let fixture: ComponentFixture<FavouritesComponent>
  let debugElement: DebugElement
  let mockEcosolutionsTaggingService!: {
    removeFavorite: jest.Mock<any, any>
  }
  let ecosolutionsTaggingService: EcosolutionsTaggingService
  let router: Router

  beforeEach(async () => {
    mockEcosolutionsTaggingService = {
      removeFavorite: jest.fn().mockReturnValue(of({ smeId: 'eco1', ecosolutionId: '123', tag: TaggingEnum.FAVOURITES })),
    }
    const routerSpy = {
      navigate: jest.fn(),
    }
    await TestBed.configureTestingModule({
      imports: [FavouritesComponent, CardProductComponent, TranslateModule.forRoot(), RouterModule],
      providers: [
        provideHttpClient(),
        {
          provide: EcosolutionsTaggingService,
          useValue: mockEcosolutionsTaggingService,
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FavouritesComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('id', '123')
    fixture.componentRef.setInput('ecosolutionFavorites', mockFavorite)
    fixture.detectChanges()
    router = TestBed.inject(Router)
    ecosolutionsTaggingService = TestBed.inject(EcosolutionsTaggingService)

    debugElement = fixture.debugElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('load ecosolutionFavorites on component initialization', () => {
    expect(component.ecosolutionFavorites()).toEqual(mockFavorite)
  })

  it('should show list favourite ecosolutions on component initialization', () => {
    fixture.detectChanges()
    const cardProduct = debugElement.queryAll(By.directive(CardProductComponent))
    expect(cardProduct.length).toBe(2)
  })

  it('should remove a favorite item when a valid ecosolutionId is provided', () => {
    const ecosolutionId = 'test-ecosolution-id'

    component.removeFavorite(ecosolutionId)
    mockEcosolutionsTaggingService.removeFavorite(component.id(), ecosolutionId).subscribe(() => {
      expect(mockEcosolutionsTaggingService.removeFavorite).toHaveBeenCalledWith(component.id(), ecosolutionId)
      expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { hash: expect.any(String) } })
    })
  })

  it('should navigate to ecosolution detail page when showMore is called', () => {
    const ecosolutionId = 'test-ecosolution-id'
    component.showMore(ecosolutionId)
    expect(router.navigate).toHaveBeenCalledWith([`ecosolutions-detail/${component.id()}/${ecosolutionId}`])
  })
})
