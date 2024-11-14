import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectCatalogDetailComponent } from './project-catalog-detail.component'

describe('ProjectCatalogDetailComponent', () => {
  let component: ProjectCatalogDetailComponent
  let fixture: ComponentFixture<ProjectCatalogDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCatalogDetailComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectCatalogDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
