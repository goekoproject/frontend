import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LeadOfBankComponent } from './lead-of-bank.component'

describe('LeadOfBankComponent', () => {
  let component: LeadOfBankComponent
  let fixture: ComponentFixture<LeadOfBankComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadOfBankComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LeadOfBankComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
