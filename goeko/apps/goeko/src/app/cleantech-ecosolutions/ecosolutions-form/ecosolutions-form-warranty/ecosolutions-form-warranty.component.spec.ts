import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormWarrantyComponent } from './ecosolutions-form-warranty.component'

describe('EcosolutionsFormWarrantyComponent', () => {
  let component: EcosolutionsFormWarrantyComponent
  let fixture: ComponentFixture<EcosolutionsFormWarrantyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormWarrantyComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormWarrantyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
