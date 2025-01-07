import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CardPreviewSustainableEquipmentComponent } from './card-preview-sustainable-equipment.component'

describe('CardPreviewSustainableEquipmentComponent', () => {
  let component: CardPreviewSustainableEquipmentComponent
  let fixture: ComponentFixture<CardPreviewSustainableEquipmentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewSustainableEquipmentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CardPreviewSustainableEquipmentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
