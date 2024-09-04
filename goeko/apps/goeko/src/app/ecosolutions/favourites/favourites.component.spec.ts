import { HttpClientTestingModule } from '@angular/common/http/testing'
import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { EcosolutionsTaggingService, SmeUser, TaggingResponse, UserService } from '@goeko/store'
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
  let mockUserService: Partial<UserService>
  let mockEcosolutionsTaggingService: Partial<EcosolutionsTaggingService>
  beforeEach(async () => {
    mockUserService = {
      userProfile: signal({ id: '123' } as SmeUser),
    }
    mockEcosolutionsTaggingService = {
      getEcosolutionFavourites: jest.fn().mockReturnValue(
        of([
          {
            id: 'd3f9d2a8-57a4-4748-9bc2-c5e9ade52832',
            ecosolution: {
              ecosolutionId: 'b5b7cdf1-0035-42b6-9f67-70ad219a0bd2',
              companyDetail: {
                name: 'EODev',
                logo: 'http://res.cloudinary.com/hqsjddtpo/image/upload/v1719387499/actor_documents/cleantechs/4d194624-d627-4592-a611-7892ea1d7965/logo/logo.jpg',
              },
              solutionName: 'GEH2',
              description: 'Groupe électro-hydrogène silencieux et zéro émission',
              classification: {
                mainCategory: 'co2Emission',
                subCategory: 'mainInternalCombustionEngine',
                products: ['generator'],
              },
            },
            tag: 'favourite',
          },
        ]),
      ),
      removeFavorite: jest.fn().mockReturnValue(of({ status: 'ok' })),
    }

    await TestBed.configureTestingModule({
      imports: [FavouritesComponent, HttpClientTestingModule, CardProductComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: EcosolutionsTaggingService,
          useValue: mockEcosolutionsTaggingService,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FavouritesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch favourite ecosolutions on component initialization', async () => {
    const favorites = [
      {
        id: 'eco123',
        ecosolution: {
          ecosolutionId: 'b5b7cdf1-0035-42b6-9f67-70ad219a0bd2',
          companyDetail: {
            name: 'EODev',
            logo: 'http://res.cloudinary.com/hqsjddtpo/image/upload/v1719387499/actor_documents/cleantechs/4d194624-d627-4592-a611-7892ea1d7965/logo/logo.jpg',
          },
          solutionName: 'GEH2',
          description: 'Groupe électro-hydrogène silencieux et zéro émission',
          classification: {
            mainCategory: 'co2Emission',
            subCategory: 'mainInternalCombustionEngine',
            products: ['generator'],
          },
        },
        tag: 'favourite',
      },
    ]
    jest.spyOn(mockEcosolutionsTaggingService, 'getEcosolutionFavourites').mockReturnValue(of(favorites))
    component.ecosolutionFavorites$.subscribe((data) => {
      expect(data).toEqual(favorites)
      fixture.detectChanges()
      expect(mockEcosolutionsTaggingService.getEcosolutionFavourites).toHaveBeenCalled()
    })
  })

  it('should create goeko-card-product components', () => {
    const cardComponents = fixture.debugElement.queryAll(By.directive(CardProductComponent))

    jest.spyOn(mockEcosolutionsTaggingService, 'getEcosolutionFavourites').mockReturnValue(of(mockFavorite))

    fixture.detectChanges()
    component.ecosolutionFavorites$.subscribe((data) => {
      expect(data).toEqual(mockFavorite)
      fixture.detectChanges()
      expect(cardComponents.length).toBe(2)
      const firstCardComponent = cardComponents[0].componentInstance as CardProductComponent
      expect(firstCardComponent.title).toBe('Solution 1')
      expect(firstCardComponent.description).toBe('Description 1')
      expect(firstCardComponent.image).toBe('logo1.png')
      expect(firstCardComponent.category).toBe('CATEGORIES.Category1')
      expect(firstCardComponent.isFavorite).toBe(true)
    })
  })

  xit('should remove a favorite item when a valid ecosolutionId is provided', () => {
    const spyRemoveService = jest.spyOn(mockEcosolutionsTaggingService, 'removeFavorite').mockReturnValue(of())
    component.removeFavorite('eco1')
    expect(spyRemoveService).toHaveBeenCalled()
  })
})
