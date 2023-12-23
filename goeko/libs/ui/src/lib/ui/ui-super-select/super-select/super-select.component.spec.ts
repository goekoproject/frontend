import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSelectComponent } from './super-select.component';

describe('SuperSelectComponent', () => {
  let component: SuperSelectComponent;
  let fixture: ComponentFixture<SuperSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
