import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { ProjectService, SmeRequestResponse } from '@goeko/store'
import { of } from 'rxjs'
import { ProjectFormComponent } from './project-form.component'
const mockSmeRequest = {
  classifications: [
    {
      mainCategory: 'test',
      subCategory: 'test',
      products: ['test'],
    },
  ],
  id: '12345',
  date: '2023-10-01',
  searchName: 'Sample Search',
  name: 'Sample Name',
  notification: {
    onNewEcosolution: true,
  },
} as SmeRequestResponse

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent
  let fixture: ComponentFixture<ProjectFormComponent>

  let activatedRouteMock: any
  let projectServiceMock = {
    getProjectId: jest.fn(),
  }
  let projectService: ProjectService
  beforeEach(async () => {
    projectServiceMock = {
      getProjectId: jest.fn().mockReturnValue(of({ id: 'dfa763f0-c81f-410b-859f-eb32365e3cbc', name: 'Test Project' })),
    }

    activatedRouteMock = {
      snapshot: {
        params: {
          smeId: 'dfa763f0-c81f-410b-859f-eb32365e',
          projectId: 'dfa763f0-c81f-410b-859f-eb32365e3cbc',
        },
      },
    }

    await TestBed.configureTestingModule({
      imports: [ProjectFormComponent, HttpClientModule],
      providers: [
        { provide: ProjectService, useValue: projectServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectFormComponent)
    component = fixture.componentInstance
    projectService = TestBed.inject(ProjectService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct project id', () => {
    expect(component.project()?.id).toBe('dfa763f0-c81f-410b-859f-eb32365e3cbc')
  })

  it('should fetch the project details', () => {
    jest.spyOn(projectService, 'getProjectId').mockReturnValue(of(mockSmeRequest))

    projectService
      .getProjectId({ smeId: 'dfa763f0-c81f-410b-859f-eb32365e', projectId: 'dfa763f0-c81f-410b-859f-eb32365e3cbc' })
      .subscribe((res) => {
        expect(component.project()?.id).toBe('dfa763f0-c81f-410b-859f-eb32365e3cbc')
      })

    expect(projectServiceMock.getProjectId).toHaveBeenCalled()
  })
})
