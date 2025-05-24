import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormPaybackComponent } from './ecosolutions-form-payback.component'

describe('EcosolutionsFormPaybackComponent', () => {
  let component: EcosolutionsFormPaybackComponent
  let fixture: ComponentFixture<EcosolutionsFormPaybackComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormPaybackComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormPaybackComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
