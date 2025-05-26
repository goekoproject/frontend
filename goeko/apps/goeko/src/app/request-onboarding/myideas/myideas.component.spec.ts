import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyideasComponent } from './myideas.component'

describe('MyideasComponent', () => {
  let component: MyideasComponent
  let fixture: ComponentFixture<MyideasComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyideasComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MyideasComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
