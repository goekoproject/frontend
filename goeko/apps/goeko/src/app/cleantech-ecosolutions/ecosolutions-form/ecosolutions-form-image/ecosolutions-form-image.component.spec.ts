import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormImageComponent } from './ecosolutions-form-image.component'

describe('EcosolutionsFormImageComponent', () => {
  let component: EcosolutionsFormImageComponent
  let fixture: ComponentFixture<EcosolutionsFormImageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormImageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormImageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
