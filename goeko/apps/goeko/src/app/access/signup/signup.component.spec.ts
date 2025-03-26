import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { USER_TYPE } from '@goeko/store'
import { ButtonModule, DialogMessageModule, DialogService, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AccessService } from '../access.services'
import { PasswordPolicyComponent } from '../password-policy/password-policy.component'
import { SignupComponent } from './signup.component'
import { TermsOfServicesComponent } from './terms-of-services.component'

describe('SignupComponent', () => {
  let component: SignupComponent
  let fixture: ComponentFixture<SignupComponent>
  let accessServiceMock: { signUp: jest.Mock; signUpAndAccess: jest.Mock; afterSignUp: jest.Mock }
  let dialogServiceMock: { open: jest.Mock }
  beforeEach(async () => {
    accessServiceMock = {
      signUp: jest.fn(),
      signUpAndAccess: jest.fn().mockReturnValue(of({ success: true })),
      afterSignUp: jest.fn(),
    }
    dialogServiceMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    }
    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        PasswordPolicyComponent,
        ButtonModule,
        GoInputModule,
        TranslateModule.forRoot(),
        DialogMessageModule,
      ],
      providers: [
        provideHttpClientTesting(),

        {
          provide: AccessService,
          useValue: accessServiceMock,
        },
        {
          provide: DialogService,
          useValue: dialogServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SignupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should submit the form successfully for sme', () => {
    accessServiceMock.signUpAndAccess.mockReturnValue(of({ success: true }))

    component.formSignup.controls['email'].setValue('testuser@example.com')
    component.formSignup.controls['password'].setValue('password123')
    component.formSignup.controls['userType'].setValue(USER_TYPE.SME)

    component.submitSignUp()

    expect(component.formSignup.valid).toBeTruthy()
    expect(accessServiceMock.signUpAndAccess).toHaveBeenCalled()
    expect(component.formSignup.value.userType).toEqual(USER_TYPE.SME)
    // Add more expectations based on what submitSignUp does
  })
  it('should submit the form successfully for cleantech', () => {
    accessServiceMock.signUpAndAccess.mockReturnValue(of({ success: true }))

    component.formSignup.controls['email'].setValue('testuser@example.com')
    component.formSignup.controls['password'].setValue('password123')
    component.formSignup.controls['userType'].setValue(USER_TYPE.CLEANTECH)

    component.submitSignUp()

    expect(component.formSignup.valid).toBeTruthy()
    expect(accessServiceMock.signUpAndAccess).toHaveBeenCalled()
    expect(component.formSignup.value.userType).toEqual(USER_TYPE.CLEANTECH)
  })

  it('change type of user to sme', () => {
    component.getSelectedActor(USER_TYPE.SME)
    expect(component.formSignup.value.userType).toEqual(USER_TYPE.SME)
    expect(component.selectedActor()).toEqual(USER_TYPE.SME)
  })
  it('change type of user to cleantech', () => {
    component.getSelectedActor(USER_TYPE.CLEANTECH)
    expect(component.formSignup.value.userType).toEqual(USER_TYPE.CLEANTECH)
    expect(component.selectedActor()).toEqual(USER_TYPE.CLEANTECH)
  })

  it('should open terms of services dialog', () => {
    component.openTermsServices()
    const termsOfServicesComponent = fixture.debugElement.queryAll(By.directive(TermsOfServicesComponent))

    expect(dialogServiceMock.open).toHaveBeenCalled()
    expect(termsOfServicesComponent).toBeTruthy()
  })
})
