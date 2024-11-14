import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IArrowDownComponent } from './i-arrow-down.component'

describe('IArrowDownComponent', () => {
  let component: IArrowDownComponent
  let fixture: ComponentFixture<IArrowDownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IArrowDownComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(IArrowDownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
