import { ClassificationCategoryProduct } from "@goeko/store";

export const compareWithProducts = (
    product: ClassificationCategoryProduct,
    productCodeSelected: ClassificationCategoryProduct | string | any
  ) => {
    return product.code === productCodeSelected?.code ||  product.code === productCodeSelected;
    
  };