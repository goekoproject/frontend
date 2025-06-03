import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DetailRequestOnboardingComponent } from './detail-request-onboarding.component'

describe('DetailRequestOnboardingComponent', () => {
  let component: DetailRequestOnboardingComponent
  let fixture: ComponentFixture<DetailRequestOnboardingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRequestOnboardingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DetailRequestOnboardingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
