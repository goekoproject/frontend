import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FundingMatchesResultComponent } from './funding-matches-result.component'

describe('FundingMatchesResultComponent', () => {
  let component: FundingMatchesResultComponent
  let fixture: ComponentFixture<FundingMatchesResultComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundingMatchesResultComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FundingMatchesResultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
