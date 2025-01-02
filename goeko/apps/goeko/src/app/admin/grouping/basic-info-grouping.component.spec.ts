import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BasicInfoGroupingComponent } from './basic-info-grouping.component'

describe('BasicInfoGroupingComponent', () => {
  let component: BasicInfoGroupingComponent
  let fixture: ComponentFixture<BasicInfoGroupingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfoGroupingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BasicInfoGroupingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
