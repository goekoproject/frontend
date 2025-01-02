import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogManagmentCategoryComponent } from './dialog-managment-category.component'

describe('DialogManagmentCategoryComponent', () => {
  let component: DialogManagmentCategoryComponent
  let fixture: ComponentFixture<DialogManagmentCategoryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogManagmentCategoryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogManagmentCategoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
