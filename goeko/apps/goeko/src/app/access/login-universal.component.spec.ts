import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginUniversalComponent } from './login-universal.component'

describe('LoginUniversalComponent', () => {
  let component: LoginUniversalComponent
  let fixture: ComponentFixture<LoginUniversalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUniversalComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginUniversalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
