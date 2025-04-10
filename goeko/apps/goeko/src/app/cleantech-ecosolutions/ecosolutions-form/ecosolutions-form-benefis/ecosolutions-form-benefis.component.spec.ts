import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormBenefisComponent } from './ecosolutions-form-benefis.component'

describe('EcosolutionsFormBenefisComponent', () => {
  let component: EcosolutionsFormBenefisComponent
  let fixture: ComponentFixture<EcosolutionsFormBenefisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormBenefisComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormBenefisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
