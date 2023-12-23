import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundUiBreadcrumbsdetailsComponent } from './playground-ui-breadcrumbsdetails.component';

describe('PlaygroundUiBreadcrumbsdetailsComponent', () => {
  let component: PlaygroundUiBreadcrumbsdetailsComponent;
  let fixture: ComponentFixture<PlaygroundUiBreadcrumbsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundUiBreadcrumbsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundUiBreadcrumbsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
