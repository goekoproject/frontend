import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogLeadBankComponent } from './dialog-lead-bank.component'

describe('DialogLeadBankComponent', () => {
  let component: DialogLeadBankComponent
  let fixture: ComponentFixture<DialogLeadBankComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLeadBankComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogLeadBankComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
