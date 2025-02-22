import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DashboardBankComponent } from './dashboard-bank.component'

describe('DashboardBankComponent', () => {
  let component: DashboardBankComponent
  let fixture: ComponentFixture<DashboardBankComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBankComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardBankComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
