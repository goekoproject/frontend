import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RequestOnboardingComponent } from './request-onboarding.component'

describe('RequestOnboardingComponent', () => {
  let component: RequestOnboardingComponent
  let fixture: ComponentFixture<RequestOnboardingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestOnboardingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RequestOnboardingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
