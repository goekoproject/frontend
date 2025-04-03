import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionInfoComponent } from './ecosolution-info.component'

describe('EcosolutionInfoComponent', () => {
  let component: EcosolutionInfoComponent
  let fixture: ComponentFixture<EcosolutionInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionInfoComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
