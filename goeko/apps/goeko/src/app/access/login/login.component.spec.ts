import { provideLocationMocks } from '@angular/common/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { AlertComponent, ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core' // Correct import
import { AccessService } from '../access.services'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let mockAccessService: jest.Mocked<AccessService>

  beforeEach(async () => {
    // Create a mock AccessService
    mockAccessService = {
      login: jest.fn(),
    } as any

    await TestBed.configureTestingModule({
      imports: [LoginComponent, AlertComponent, ButtonModule, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: AccessService, useValue: mockAccessService }, provideRouter([]), provideLocationMocks()],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('Template Rendering', () => {
    it('should render login title', () => {
      const titleElement = fixture.debugElement.query(By.css('h1'))
      expect(titleElement.nativeElement.textContent.trim()).toBe('LOGIN.msglogin')
    })

    it('should show error alert when errorMsgLogin is set', () => {
      const _msgError = 'ERROR_MESSAGES.invalid_user_password'
      // Initially no error alert
      let alertElement = fixture.debugElement.query(By.directive(AlertComponent))
      expect(alertElement).toBeNull()

      // Set error message
      component.errorMsgLogin.set(_msgError)
      fixture.detectChanges()

      // Now error alert should be present
      alertElement = fixture.debugElement.query(By.directive(AlertComponent))
      expect(alertElement).not.toBeNull()

      // Check error message translation
      expect(alertElement.nativeElement.textContent.trim()).toBeTruthy()
    })

    it('should toggle password visibility', () => {
      // Initial state
      expect(component.showPassword).toBeFalsy()

      // Find password input and eye icon
      const eyeIcon = fixture.debugElement.query(By.css('.ti-eye, .ti-eye-closed'))

      // Toggle password visibility
      eyeIcon.triggerEventHandler('click', null)
      fixture.detectChanges()

      expect(component.showPassword).toBeTruthy()
    })

    it('should handle form submission', () => {
      // Set valid form data
      component.formLogin.setValue({
        email: 'test@example.com',
        password: 'password123',
      })
      fixture.detectChanges()

      // Find submit button and trigger click
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'))

      // Spy on submit method
      const submitSpy = jest.spyOn(component, 'submit')

      // Trigger button click
      submitButton.triggerEventHandler('click', null)

      expect(submitSpy).toHaveBeenCalled()
    })
  })

  // ... (rest of the previous test suite remains the same)
})
