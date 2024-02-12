import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadsListComponent } from './leads-list.component';

describe('LeadsListComponent', () => {
  let component: LeadsListComponent;
  let fixture: ComponentFixture<LeadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
