import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ButtonModule, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AccessService } from '../access.services'
import { ResetPasswordComponent } from './reset-password.component'

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent
  let fixture: ComponentFixture<ResetPasswordComponent>
  let accessServiceMock: { changePassword: jest.Mock }

  beforeEach(async () => {
    accessServiceMock = {
      changePassword: jest.fn().mockReturnValue(of({ success: true })),
    }
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ReactiveFormsModule, ButtonModule, GoInputModule, TranslateModule.forRoot()],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: AccessService,
          useValue: accessServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ResetPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should reset password', () => {
    component.formResetPassword.setValue({ email: 'test@test.email' })
    component.resetPassword()
    expect(component.formResetPassword.valid).toBeTruthy()
    expect(accessServiceMock.changePassword).toHaveBeenCalled()
  })

  it('form should be invalid', () => {
    component.formResetPassword.setValue({ email: 'test' })
    component.resetPassword()
    expect(component.formResetPassword.valid).toBeFalsy()
    expect(accessServiceMock.changePassword).not.toHaveBeenCalled()
  })
})
