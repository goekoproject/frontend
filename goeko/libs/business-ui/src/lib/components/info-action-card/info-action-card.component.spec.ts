import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InfoActionCardComponent } from './info-action-card.component'

describe('InfoActionCardComponent', () => {
  let component: InfoActionCardComponent
  let fixture: ComponentFixture<InfoActionCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoActionCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InfoActionCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
