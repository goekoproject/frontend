import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddCategorySubcategoryGroupComponent } from './add-category-subcategory-group.component'

describe('AddCategorySubcategoryGroupComponent', () => {
  let component: AddCategorySubcategoryGroupComponent
  let fixture: ComponentFixture<AddCategorySubcategoryGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategorySubcategoryGroupComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddCategorySubcategoryGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
