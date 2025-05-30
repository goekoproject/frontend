import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestOnboardingFormComponent } from './request-onboarding-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RequestOnboardingFormComponent', () => {
  let component: RequestOnboardingFormComponent;
  let fixture: ComponentFixture<RequestOnboardingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RequestOnboardingFormComponent
      ],
      schemas: [NO_ERRORS_SCHEMA] // To ignore the errors for child components
    }).compileComponents();

    fixture = TestBed.createComponent(RequestOnboardingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('solutionName')?.value).toBe('My colleague solution');
    expect(component.form.get('companyName')?.value).toBe('My colleague solution');
    expect(component.classifications.length).toBe(1);
    expect(component.locations.length).toBe(1);
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.form.get('solutionName')?.setValue('');
    component.form.get('companyName')?.setValue('');
    expect(component.form.valid).toBeFalsy();
  });
});
