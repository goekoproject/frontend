import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoTableComponent } from './go-table.component';

describe('GoTableComponent', () => {
  let component: GoTableComponent;
  let fixture: ComponentFixture<GoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
