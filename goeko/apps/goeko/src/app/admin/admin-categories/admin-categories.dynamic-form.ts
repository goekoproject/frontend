import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Product } from '@goeko/business-ui';
import { ManageProduct, ManageSubcategory } from '@goeko/store';

export abstract class AdminCategoriesDynamicForm {
  static _fb: FormBuilder | undefined;

  static buildForm = (
    {
      fb = {} as FormBuilder,
      group = new Object() as any,
      formGroup = new FormGroup<any>(''),
    },
    controlObj?: FormGroup
  ) => {
    this._fb = fb;
    Object.keys(group).forEach((key) => {
      const controlName = key as keyof ManageSubcategory;
      const formValue = group[controlName];
      if (typeof formValue === 'object' && controlName !== 'products') {
        this._isObjectFormControl(
          formValue,
          controlName,
          formGroup,
          controlObj
        );

        this.buildForm(
          {
            fb: this._fb,
            group: formValue,
            formGroup: formGroup,
          },
          formGroup.get(controlName) as FormGroup
        );
        return;
      }
      formGroup.addControl(controlName, this._fb?.control(formValue));
    });
  };
  private static _isObjectFormControl = (
    obj: object,
    controlName: any,
    parentFormGroup: FormGroup,
    controlObj?: FormGroup
  ) => {
    if (obj instanceof Array && controlObj) {
      this._isArrayFormControl(obj, controlName, controlObj);
      return;
    }
    if (isNaN(parseInt(controlName)) === false) {
      return;
    }
    parentFormGroup.addControl(controlName, this._fb?.group(''));
  };

  private static _isArrayFormControl = (
    obj: Array<any>,
    controlName: any,
    controlObj: FormGroup
  ) => {
    const formArray = new FormArray<any>([]);
    obj.forEach((element: any) => formArray.push(this._fb?.group(element)));
    controlObj.addControl(controlName, formArray);
  };
}

export const mergeProducts = (
  productsValue: ManageProduct[],
  productsSelected: Product[]
) => {
  return productsValue.map((productValue: ManageProduct) => {
    const findProduct = productsSelected.find(
      (selected) => selected.id === productValue.code
    );

    return {
      ...productValue,
      findProduct,
    };
  });
};
