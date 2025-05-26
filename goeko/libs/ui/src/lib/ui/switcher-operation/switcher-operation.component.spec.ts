import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SwitcherOperationComponent } from './switcher-operation.component'

describe('SwitcherOperationComponent', () => {
  let component: SwitcherOperationComponent
  let fixture: ComponentFixture<SwitcherOperationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitcherOperationComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SwitcherOperationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
