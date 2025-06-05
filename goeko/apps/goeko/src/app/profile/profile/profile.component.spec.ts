import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
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
    profileServiceMock = {
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
      uploadImgProfileBank: jest.fn().mockReturnValue({
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
      userProfile: signal(new SmeUser()),
      userType: signal(USER_TYPE.SME),
      externalId: signal('123'),
      selectedCodeLang: signal({ code: 'en', label: 'English' }),
      countries: signal([
        { code: 'CH-AG', label: 'Argovie' },
        { code: 'CH-AR', label: 'Appenzell Rhodes-Extérieures' },
        { code: 'CH-AI', label: 'Appenzell Rhodes-Intérieures' },
        { code: 'CH-BL', label: 'Bâle-Campagne' },
      ]),
      regions: signal([
        { code: 'FR-ARA', label: 'Auvergne-Rhône-Alpes' },
        { code: 'FR-BFC', label: 'Bourgogne-Franche-Comté' },
        { code: 'FR-BRE', label: 'Bretagne' },
        { code: 'FR-20R', label: 'Corse' },
      ]),
      username: signal('testuser'),
    }

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), ButtonModule, GoInputModule, SelectLocationsComponent],
      providers: [
        { provide: ProfileService, useValue: profileServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue('123'),
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

  it('should initialize form based on user type', () => {
    // Arrange
    const profileComponent = component
    // Assert
    expect(profileComponent.form).toBeDefined()
    expect(profileComponent.formSection).toEqual(PROFILE_SME)
    expect(profileComponent.form.get('externalId')?.value).toBe('123')
  })

  it('should load profile data', () => {
    // Arrange
    const profileComponent = component
    const mockData: SmeUser = {
      id: '1',
      externalId: '123',
      userType: USER_TYPE.SME,
      name: 'Test User',
      email: 'text@test.com',
      locations: [],
      employees: 0,
      notification: {
        email: 'text@test.com',
        lang: 'en',
        phoneNumber: '123456789',
        enabled: true,
      },
    }

    profileServiceMock.userProfile?.set(mockData)

    expect(profileComponent.form.get('name')?.value).toBe('Test User')
    expect(profileComponent.form.get('email')?.value).toBe('text@test.com')
    expect(profileComponent.form.get('comunicationLanguage')?.value).toEqual({ code: 'en', label: 'English' })
    expect(profileComponent.form.get('phoneNumber')?.value).toBe('123456789')
    expect(profileComponent.form.get('generalNotifications')?.value).toBe(true)
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
      identifier: 'A1111111',
    }

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
      identifier: 'A1111111',
      notificacion: {
        email: 'tes@test.com',
        phoneNumber: '123456789',
        lang: 'en',
      },
    }
    jest.spyOn(profileServiceMock, 'userProfile').mockReturnValue(user)

    component.form.patchValue({ name: user.name, email: user.email, employees: user.employees })

    jest.spyOn(profileServiceMock, 'updateUserProfile').mockReturnValue(of(updateUser))
    jest.spyOn(profileServiceMock, 'uploadImgProfile').mockReturnValue(of(null))

    profileComponent.updateProfile()
    expect(profileServiceMock.updateUserProfile).toHaveBeenCalled()
    expect(profileComponent.dataProfile()).toEqual(updateUser)
  })
  // clears the locations array when userType is SME and locations exist

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
