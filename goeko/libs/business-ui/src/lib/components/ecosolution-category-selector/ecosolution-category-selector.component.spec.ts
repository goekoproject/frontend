import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionCategorySelectorComponent } from './ecosolution-category-selector.component'

describe('EcosolutionCategorySelectorComponent', () => {
  let component: EcosolutionCategorySelectorComponent
  let fixture: ComponentFixture<EcosolutionCategorySelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionCategorySelectorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionCategorySelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
