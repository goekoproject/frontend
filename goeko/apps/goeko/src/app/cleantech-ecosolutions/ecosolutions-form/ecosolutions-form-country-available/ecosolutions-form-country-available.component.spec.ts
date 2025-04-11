import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormCountryAvailableComponent } from './ecosolutions-form-country-available.component'

describe('EcosolutionsFormCountryAvailableComponent', () => {
  let component: EcosolutionsFormCountryAvailableComponent
  let fixture: ComponentFixture<EcosolutionsFormCountryAvailableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormCountryAvailableComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormCountryAvailableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
