import { TranslateService } from '@ngx-translate/core';

export interface ManageCategory {
  id?: string;
  code: string;
  subcategories: ManageSubcategory[];
  disabled: boolean;
}

export interface ManageSubcategory {
  id: string;
  code: string;
  label: {
    translations: Translations[];
  };
  products?: ManageProduct[];
  disabled: boolean;
}

export interface ManageProduct {
  code: string;
  label: {
    translations: Translations[];
  };
  disabled: boolean;
}

export interface Translations {
  label: string;
  lang: string;
}

export const NULL_MANAGE_CATEGORY = {
  id: '',
  code: '',
  subcategories: [],
  disabled: false,
};

export class ProductSelectToManageProduct implements ManageProduct {
  code: string;
  label: { translations: Translations[] };
  disabled: boolean;
  constructor(id: string, translations: Translations[]) {
    this.code = id;
    this.label = {
      translations: translations,
    };
    this.disabled = false;
  }
}
