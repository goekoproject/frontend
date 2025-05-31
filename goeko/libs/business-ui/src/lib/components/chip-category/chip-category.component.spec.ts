import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChipCategoryComponent } from './chip-category.component'

describe('ChipCategoryComponent', () => {
  let component: ChipCategoryComponent
  let fixture: ComponentFixture<ChipCategoryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipCategoryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ChipCategoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
