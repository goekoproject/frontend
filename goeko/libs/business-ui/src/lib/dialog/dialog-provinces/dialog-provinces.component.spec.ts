import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogProvincesComponent } from './dialog-provinces.component';

describe('DialogProvincesComponent', () => {
  let component: DialogProvincesComponent;
  let fixture: ComponentFixture<DialogProvincesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProvincesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
