import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RequestOnboardingFormComponent } from './request-onboarding-form.component'

describe('RequestOnboardingFormComponent', () => {
  let component: RequestOnboardingFormComponent
  let fixture: ComponentFixture<RequestOnboardingFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestOnboardingFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RequestOnboardingFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
