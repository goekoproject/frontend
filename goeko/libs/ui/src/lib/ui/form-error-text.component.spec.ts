import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormErrorTextComponent } from './form-error-text.component'

describe('FormErrorTextComponent', () => {
  let component: FormErrorTextComponent
  let fixture: ComponentFixture<FormErrorTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorTextComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormErrorTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
