import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormDetailsComponent } from './ecosolutions-form-details.component'

describe('EcosolutionsFormDetailsComponent', () => {
  let component: EcosolutionsFormDetailsComponent
  let fixture: ComponentFixture<EcosolutionsFormDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormDetailsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
