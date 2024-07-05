import { HttpClientTestingModule } from '@angular/common/http/testing'
import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { Picture, SmeUser, USER_TYPE } from '@goeko/store'
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
      createUserProfile: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn().mockImplementation((callbacks) => {
            callbacks.next({ id: 1 })
          }),
        }),
      }),
      updateUserProfile: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn().mockImplementation((callbacks) => {
            callbacks.next({ id: 1 })
          }),
        }),
      }),
      uploadImgProfile: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn().mockImplementation((callbacks) => {
            callbacks.next([
              {
                id: 1,
                url: 'http://test.com/test.png',
                name: 'test.png',
              },
            ])
          }),
        }),
      }),

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

  // Save User
  it('should successfully create user profile sme when form is valid with a picture', () => {
    const profileComponent = component
    const newUser: SmeUser = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [],
      employees: 0,
    }
    const pic: Picture[] = [
      {
        id: '1',
        url: 'http://test.com/test.png',
        name: 'test.png',
      },
    ]
    profileComponent.ngOnInit()
    profileComponent.fileChange([new File([], 'test.png')])

    jest.spyOn(profileServiceMock, 'createUserProfile').mockReturnValue(of(newUser))
    jest.spyOn(profileServiceMock, 'uploadImgProfile').mockReturnValue(of(pic))

    profileComponent.saveProfile()
    expect(profileServiceMock.createUserProfile).toHaveBeenCalled()
    expect(profileServiceMock.uploadImgProfile).toHaveBeenCalled()
    expect(profileComponent.dataProfile()).toEqual(newUser)
  })
  it('should successfully create user profile sme when form is valid whithout a picture', () => {
    const profileComponent = component
    const newUser: SmeUser = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [],
      employees: 0,
    }

    profileComponent.ngOnInit()

    jest.spyOn(profileServiceMock, 'createUserProfile').mockReturnValue(of(newUser))

    profileComponent.saveProfile()
    expect(profileServiceMock.createUserProfile).toHaveBeenCalled()
    expect(profileServiceMock.uploadImgProfile).toHaveBeenCalledTimes(0)
    expect(profileComponent.dataProfile()).toEqual(newUser)
  })

  // Update User
  it('should successfully update user profile sme when form is valid with a picture', () => {
    const profileComponent = component
    const updateUser = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [],
      employees: 0,
    }
    jest.spyOn(profileServiceMock, 'userProfile').mockReturnValue(updateUser)

    profileComponent.ngOnInit()
    profileComponent.fileChange([new File([], 'test.png')])
    component.form.patchValue({ name: 'Test User', email: 'test@example.com', employees: 10 })

    jest.spyOn(profileServiceMock, 'updateUserProfile').mockReturnValue(of(updateUser))

    profileComponent.updateProfile()
    expect(profileServiceMock.updateUserProfile).toHaveBeenCalled()
    expect(profileServiceMock.uploadImgProfile).toHaveBeenCalled()
  })
  // Update User
  it('should successfully update name user profile sme when form is valid without a picture', () => {
    const profileComponent = component
    const user = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [],
      employees: 0,
    }
    const updateUser = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User2',
      email: 'test@test.com',
      locations: [],
      employees: 0,
    }
    jest.spyOn(profileServiceMock, 'userProfile').mockReturnValue(user)

    profileComponent.ngOnInit()
    component.form.patchValue({ name: user.name, email: user.email, employees: user.employees })

    jest.spyOn(profileServiceMock, 'updateUserProfile').mockReturnValue(of(updateUser))
    jest.spyOn(profileServiceMock, 'uploadImgProfile').mockReturnValue(of(null))

    profileComponent.updateProfile()
    expect(profileServiceMock.updateUserProfile).toHaveBeenCalled()
    expect(profileComponent.dataProfile()).toEqual(updateUser)
  })
  // clears the locations array when userType is SME and locations exist
  it('should clear the locations array when userType is SME and locations exist', () => {
    const user = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [{ country: { code: { code: 'CH', label: 'Suisse' }, regions: [] } }],
      employees: 0,
    }
    component.dataProfile = signal(user)

    component.ngOnInit()

    expect(component.locationsArrays.length).toBe(1)
  })

  it('should return true when dataProfile().id is defined', () => {
    const user = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [{ country: { code: { code: 'CH', label: 'Suisse' }, regions: [] } }],
      employees: 0,
    }
    component.dataProfile = signal(user)
    const result = component.canDeactivate()
    expect(result).toBe(true)
  })
  it('should return false when dataProfile().id is undefined', () => {
    component.dataProfile = signal(new SmeUser())
    const result = component.canDeactivate()
    expect(result).toBe(false)
  })
})
