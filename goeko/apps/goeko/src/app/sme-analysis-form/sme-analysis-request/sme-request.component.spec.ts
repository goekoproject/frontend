import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmeRequestComponent } from './sme-analysis-request.component';

describe('SmeRequestComponent', () => {
  let component: SmeRequestComponent;
  let fixture: ComponentFixture<SmeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmeRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
