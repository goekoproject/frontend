import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataAdminComponent } from './admin-users.component'

describe('DataAdminComponent', () => {
  let component: DataAdminComponent
  let fixture: ComponentFixture<DataAdminComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAdminComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DataAdminComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
