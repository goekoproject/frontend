import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectEcosolutionsFiltersComponent } from './project-ecosolutions-filters.component'

describe('ProjectEcosolutionsFiltersComponent', () => {
  let component: ProjectEcosolutionsFiltersComponent
  let fixture: ComponentFixture<ProjectEcosolutionsFiltersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEcosolutionsFiltersComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectEcosolutionsFiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
