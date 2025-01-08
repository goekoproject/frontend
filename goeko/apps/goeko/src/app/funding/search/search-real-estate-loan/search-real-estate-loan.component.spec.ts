import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchRealEstateLoanComponent } from './search-real-estate-loan.component'

describe('SearchRealEstateLoanComponent', () => {
  let component: SearchRealEstateLoanComponent
  let fixture: ComponentFixture<SearchRealEstateLoanComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRealEstateLoanComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchRealEstateLoanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
