import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBreadcrumbsComponent } from './ui-breadcrumbs.component';

describe('UiBreadcrumbsComponent', () => {
  let component: UiBreadcrumbsComponent;
  let fixture: ComponentFixture<UiBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiBreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
