import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DisplaySearchFundingComponent } from './display-search-funding.component'

describe('DisplaySearchFundingComponent', () => {
  let component: DisplaySearchFundingComponent
  let fixture: ComponentFixture<DisplaySearchFundingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySearchFundingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DisplaySearchFundingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
