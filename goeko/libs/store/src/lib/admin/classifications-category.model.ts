export interface ClassificationCategory {
  id: string;
  code: string;
  label?: string;
  subcategories?: ClassificationSubcategory[];
}

export interface ClassificationSubcategory {
  id: string;
  code: string;
  label: string;
  question?: string;
  products?: ClassificationCategoryProduct[];
}

export interface ClassificationCategoryProduct {
  id: string;
  code: string;
  label: string;
  disabled?: boolean;
}

export const NULL_CLASSIFICATION_CATEGORY: ClassificationCategory = {
  id: '',
  code: 'none',
};
