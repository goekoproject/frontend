import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CardPreviewRealEstateLoanComponent } from './card-preview-real-estate-loan.component'

describe('CardPreviewRealEstateLoanComponent', () => {
  let component: CardPreviewRealEstateLoanComponent
  let fixture: ComponentFixture<CardPreviewRealEstateLoanComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewRealEstateLoanComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CardPreviewRealEstateLoanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
