import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TermsOfServicesComponent } from './terms-of-services.component'

describe('TermsOfServicesComponent', () => {
  let component: TermsOfServicesComponent
  let fixture: ComponentFixture<TermsOfServicesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsOfServicesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TermsOfServicesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
