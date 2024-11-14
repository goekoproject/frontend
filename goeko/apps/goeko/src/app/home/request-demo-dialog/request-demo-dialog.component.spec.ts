import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RequestDemoDialogComponent } from './request-demo-dialog.component'

describe('RequestDemoDialogComponent', () => {
  let component: RequestDemoDialogComponent
  let fixture: ComponentFixture<RequestDemoDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDemoDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RequestDemoDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
