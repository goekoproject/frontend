import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  signal
} from '@angular/core';
import { DataSelect, ManageProduct } from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  DIALOG_DATA,
  SideDialogService
} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';

interface DialogData {
  productSelected: ManageProduct[];
  subcategoryCode: keyof typeof DataSelect;
}
export interface Product {
  id: string;
  keyLang: string;
}
@Component({
  selector: 'goeko-products-management',
  standalone: true,
  imports: [CommonModule, BadgeModule, TranslateModule, ButtonModule],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent implements OnInit {
  buttonText = 'PRODUCT_ACTIONS.addProduct';
  products = signal<Product[]>([] as any);
  codeProductsSeclected = signal(
    this.data.productSelected.map((product) => product.code)
  );
  private _productSelected!: Product[];
  constructor(
    @Optional()
    @Inject(DIALOG_DATA)
    public data: DialogData,
    private _sideDialogService: SideDialogService
  ) {}

  ngOnInit(): void {
    const productsStore = DataSelect[this.data.subcategoryCode] as any;
    this.products.set(productsStore);
  }
  valueSelected(productSelected: Product[]) {
    this._productSelected = productSelected;
  }

  addProducts() {
    this._sideDialogService.closeDialog<Product[]>(this._productSelected);
  }
  close() {
    this._sideDialogService.closeDialog<Product[]>();

  }
}
