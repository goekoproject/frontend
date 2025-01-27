import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectCertificateComponent } from './select-certificate.component'

describe('SelectCertificateComponent', () => {
  let component: SelectCertificateComponent
  let fixture: ComponentFixture<SelectCertificateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCertificateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SelectCertificateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
