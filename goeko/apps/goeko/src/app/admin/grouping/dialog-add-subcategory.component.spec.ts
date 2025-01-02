import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'

describe('DialogAddSubcategoryComponent', () => {
  let component: DialogAddSubcategoryComponent
  let fixture: ComponentFixture<DialogAddSubcategoryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddSubcategoryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogAddSubcategoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
