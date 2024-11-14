import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CoretoolsComponent } from './coretools.component'

describe('CoretoolsComponent', () => {
  let component: CoretoolsComponent
  let fixture: ComponentFixture<CoretoolsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoretoolsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CoretoolsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
