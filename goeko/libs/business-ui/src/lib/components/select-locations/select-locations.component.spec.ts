import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLocationsComponent } from './select-locations.component';

describe('SelectLocationsComponent', () => {
  let component: SelectLocationsComponent;
  let fixture: ComponentFixture<SelectLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLocationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
