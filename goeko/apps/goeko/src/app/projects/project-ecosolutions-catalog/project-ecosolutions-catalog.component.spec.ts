import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectEcosolutionCatalogComponent } from './project-ecosolutions-catalog.component'

describe('ProjectEcosolutionCatalogComponent', () => {
  let component: ProjectEcosolutionCatalogComponent
  let fixture: ComponentFixture<ProjectEcosolutionCatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEcosolutionCatalogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectEcosolutionCatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
