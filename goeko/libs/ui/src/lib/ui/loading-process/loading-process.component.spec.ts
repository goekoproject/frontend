import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingProcessComponent } from './loading-process.component'

describe('LoadingProcessComponent', () => {
  let component: LoadingProcessComponent
  let fixture: ComponentFixture<LoadingProcessComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingProcessComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LoadingProcessComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
