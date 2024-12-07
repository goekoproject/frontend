import { CommonModule } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LeadFormComponent, PictureGetUrlPipe, SdgIconsComponent } from '@goeko/business-ui'
import { SafePipe } from '@goeko/coretools'
import { Document, UserService } from '@goeko/store'
import { BadgeModule, ButtonModule, DialogMessageModule, InputFileComponent, PercentageModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { mockDetail } from './mock.detail.constant'
import { ProjectCatalogDetailComponent } from './project-catalog-detail.component'

describe('ProjectCatalogDetailComponent', () => {
  let component: ProjectCatalogDetailComponent
  let fixture: ComponentFixture<ProjectCatalogDetailComponent>
  const mockUserService = {
    userProfile: jest.fn().mockReturnValue({ id: 'user123', name: 'Test User' }),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        BadgeModule,
        SdgIconsComponent,
        SafePipe,
        InputFileComponent,
        PictureGetUrlPipe,
        PercentageModule,
        LeadFormComponent,
        ButtonModule,
        ProjectCatalogDetailComponent,
        DialogMessageModule,
      ],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectCatalogDetailComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('ecosolutionId', '123')
    fixture.componentRef.setInput('ecosolutionSearchDetail', mockDetail)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have CATEGORIES defined', () => {
    expect(component.CATEGORIES).toBeDefined()
  })

  it('should call goBack method', () => {
    spyOn(window.history, 'back')
    component.goBack()
    expect(window.history.back).toHaveBeenCalled()
  })

  it('should open certified file URL in a new tab', () => {
    const mockDocument: Document = { url: 'http://example.com', id: '1', name: 'test' }
    spyOn(window, 'open')
    component.downloadCertified(mockDocument)
    expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank')
  })

  it('should not open a new tab if certified file URL is not defined', () => {
    const mockDocument: Document = { url: '', id: '1', name: 'test' }
    spyOn(window, 'open')
    component.downloadCertified(mockDocument)
    expect(window.open).not.toHaveBeenCalled()
  })
})
