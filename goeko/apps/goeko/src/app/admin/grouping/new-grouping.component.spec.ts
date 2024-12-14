import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewGroupingComponent } from './new-grouping.component'

describe('NewGroupingComponent', () => {
  let component: NewGroupingComponent
  let fixture: ComponentFixture<NewGroupingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGroupingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NewGroupingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
