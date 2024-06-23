import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFormLangComponent } from './select-form-lang.component';

describe('SelectFormLangComponent', () => {
  let component: SelectFormLangComponent;
  let fixture: ComponentFixture<SelectFormLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFormLangComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFormLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
