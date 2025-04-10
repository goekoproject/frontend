import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormEcosolutionTypeComponent } from './ecosolutions-form-ecosolution-type.component'

describe('EcosolutionsFormEcosolutionTypeComponent', () => {
  let component: EcosolutionsFormEcosolutionTypeComponent
  let fixture: ComponentFixture<EcosolutionsFormEcosolutionTypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormEcosolutionTypeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormEcosolutionTypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
