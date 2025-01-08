import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SustainbleEquipmentFormComponent } from './sustainble-equipment-form.component'

describe('SustainbleEquipmentFormComponent', () => {
  let component: SustainbleEquipmentFormComponent
  let fixture: ComponentFixture<SustainbleEquipmentFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SustainbleEquipmentFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SustainbleEquipmentFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
