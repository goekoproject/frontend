import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GoInputComponent } from './go-input.component'

describe('GoInputComponent', () => {
  let component: GoInputComponent
  let fixture: ComponentFixture<GoInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoInputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GoInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
