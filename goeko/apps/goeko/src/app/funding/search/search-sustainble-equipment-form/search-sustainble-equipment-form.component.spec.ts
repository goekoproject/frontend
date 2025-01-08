import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchSustainbleEquipmentFormComponent } from './search-sustainble-equipment-form.component'

describe('SearchSustainbleEquipmentFormComponent', () => {
  let component: SearchSustainbleEquipmentFormComponent
  let fixture: ComponentFixture<SearchSustainbleEquipmentFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSustainbleEquipmentFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchSustainbleEquipmentFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
