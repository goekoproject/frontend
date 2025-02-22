import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TableLeadsBankComponent } from './table-leads-bank.component'

describe('TableLeadsBankComponent', () => {
  let component: TableLeadsBankComponent
  let fixture: ComponentFixture<TableLeadsBankComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLeadsBankComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TableLeadsBankComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
