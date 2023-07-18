import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundSuperSelectComponent } from './playground-super-select.component';

describe('PlaygroundSuperSelectComponent', () => {
  let component: PlaygroundSuperSelectComponent;
  let fixture: ComponentFixture<PlaygroundSuperSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundSuperSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundSuperSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
