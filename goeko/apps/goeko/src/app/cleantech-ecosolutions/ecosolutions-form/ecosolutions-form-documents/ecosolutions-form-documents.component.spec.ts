import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EcosolutionsFormDocumentsComponent } from './ecosolutions-form-documents.component'

describe('EcosolutionsFormDocumentsComponent', () => {
  let component: EcosolutionsFormDocumentsComponent
  let fixture: ComponentFixture<EcosolutionsFormDocumentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosolutionsFormDocumentsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcosolutionsFormDocumentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
