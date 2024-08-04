import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ButtonModule, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AccessService } from '../access.services'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  const accessServiceMock = {
    login: jest.fn(),
    signUp: jest.fn(),
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        ButtonModule,
        GoInputModule,
        TranslateModule.forRoot(),
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AccessService,
          useValue: accessServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('Sign in valid user and valid form', () => {
    component.ngOnInit()
    component.formLogin.patchValue({
      email: 'test@com',
      password: '123456',
    })

    component.submit();
    expect(component.formLogin.valid).toBeTruthy()
    expect(accessServiceMock.login).toHaveBeenCalled()
  })
})
