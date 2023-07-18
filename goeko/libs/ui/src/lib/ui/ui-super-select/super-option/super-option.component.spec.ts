import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperOptionComponent } from './super-option.component';

describe('SuperOptionComponent', () => {
  let component: SuperOptionComponent;
  let fixture: ComponentFixture<SuperOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
