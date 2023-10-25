import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundUiBreadcrumbsComponent } from './playground-ui-breadcrumbs.component';

describe('PlaygroundUiBreadcrumbsComponent', () => {
  let component: PlaygroundUiBreadcrumbsComponent;
  let fixture: ComponentFixture<PlaygroundUiBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundUiBreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundUiBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
