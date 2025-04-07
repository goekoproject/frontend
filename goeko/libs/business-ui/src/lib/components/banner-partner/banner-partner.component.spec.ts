import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BannerPartnerComponent } from './banner-partner.component'

describe('BannerPartnerComponent', () => {
  let component: BannerPartnerComponent
  let fixture: ComponentFixture<BannerPartnerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerPartnerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BannerPartnerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
