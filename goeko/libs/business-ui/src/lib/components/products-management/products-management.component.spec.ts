import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsManagementComponent } from './products-management.component';

describe('ProductsManagementComponent', () => {
  let component: ProductsManagementComponent;
  let fixture: ComponentFixture<ProductsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
