import { HttpClientTestingModule } from '@angular/common/http/testing'
import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { SmeUser, USER_TYPE } from '@goeko/store'
import { ButtonModule, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { PROFILE_SME } from './profile-sme.constants'
import { ProfileComponent } from './profile.component'
import { ProfileService } from './profile.service'

describe('ProfileComponent SME', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let profileServiceMock: Partial<ProfileService>

  beforeEach(async () => {
    // Mock del ProfileService
    profileServiceMock = {
      fetchUser: jest.fn(),
      createUserProfile: jest.fn().mockReturnValue(of({})),
      updateUserProfile: jest.fn().mockReturnValue(of({})),
      userType: signal(USER_TYPE.SME),
      externalId: signal('123'),
      selectedCodeLang: signal({ code: 'en', label: 'English' }),
      countries: signal([
        {
          code: 'CH-AG',
          label: 'Argovie',
        },
        {
          code: 'CH-AR',
          label: 'Appenzell Rhodes-Extérieures',
        },
        {
          code: 'CH-AI',
          label: 'Appenzell Rhodes-Intérieures',
        },
        {
          code: 'CH-BL',
          label: 'Bâle-Campagne',
        },
      ]),
      regions: signal([
        {
          code: 'FR-ARA',
          label: 'Auvergne-Rhône-Alpes',
        },
        {
          code: 'FR-BFC',
          label: 'Bourgogne-Franche-Comté',
        },
        {
          code: 'FR-BRE',
          label: 'Bretagne',
        },
        {
          code: 'FR-20R',
          label: 'Corse',
        },
      ]),
      userProfile: signal(new SmeUser()),
      username: signal('testuser'),

      // Añadir más métodos mockeados según sea necesario
    }

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        GoInputModule,
        SelectLocationsComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('123'), // Ejemplo, ajustar según sea necesario
              },
            },
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Ejemplo de prueba para el método ngOnInit
  it('ngOnInit should initialize form and fetch user data', () => {
    // Asumiendo que fetchUser es un método que debe ser llamado en ngOnInit
    expect(profileServiceMock.fetchUser).toHaveBeenCalled()
    // Verificar que el formulario se ha inicializado
    expect(component.form).toBeDefined()
  })

  it('should initialize form based on user type on component initialization', () => {
    // Arrange
    const profileComponent = component

    // Act
    profileComponent.ngOnInit()

    // Assert
    expect(profileComponent.form).toBeDefined()
    expect(profileComponent.formSection).toEqual(PROFILE_SME)
    expect(profileComponent.form.get('externalId')?.value).toBe('123')
  })

  it('should create a user profile successfully when form data is valid', () => {
    component.form = new FormGroup({
      name: new FormControl('Test Company'),
      email: new FormControl('test@test.com', Validators.email),
      employees: new FormControl(10),
    })
    const profileServiceMock = {
      createUserProfile: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          switchMap: jest.fn().mockReturnValue(of({id: '123'})),
        }),
        subscribe: jest.fn((callbacks) => {
          callbacks.next({ id: '123' })
        }),
      }),
      uploadImgProfile: jest.fn().mockReturnValue({
        pipe: jest.fn().mockRejectedValue({
          switchMap: jest.fn().mockReturnValue(of({})),
        }),
        subscribe: jest.fn((callbacks) => {
          callbacks.next([{ url: 'test.png' }])
        }),
      }),
    }

    component.profileImg = [new File([], 'test.png')]

    component.saveProfile()

    expect(profileServiceMock.createUserProfile).toHaveBeenCalled()
    expect(profileServiceMock.uploadImgProfile).toHaveBeenCalled()
  })
})
