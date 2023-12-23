import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ui-playground-super-select',
	templateUrl: './playground-super-select.component.html',
	styleUrls: ['./playground-super-select.component.scss'],
})
export class PlaygroundSuperSelectComponent implements OnInit {
	buttonSize = ['xsmall', 'small', 'medium', 'large'];
  buttonStatus = ['default', 'disabled','error', 'success'];
  buttonType = ['default','multiple', 'autocomplete'];

	superSelectDefault = [
		{
			id: '1',
			title: 'Item 1',
		},
		{
			id: '2',
			title: 'Item 2',
		},
		{
			id: 'super-select',
			title: 'Item 3',
		},
	];

  size = 'medium';
  status = 'default';
  type = 'default';
  form!: FormGroup;

  valueMultiple!: any;
  valueNormal!: any;
  disabled = false;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
    this._initForm();
  }

  changeSize(size: string): void{
    this.size = size;
  }
  changeStatus(status: string): void{
    if(status === 'disabled') {
      this.disabled = status === 'disabled';
    } else {
      this.status = status;
      this.disabled =false;
    }
  }
  changeType(type: string): void{
    this.type = type;
  }

  private _initForm() {
    this.form = this._fb.group({
      superMultipleSelect: ['',Validators.required],
      superDefualtSelect: []
    })
    this._superMultipleSelect();
    this._superNormalSelect();
  }
  
  private _superMultipleSelect() {
    this.form.controls['superMultipleSelect'].valueChanges.subscribe(res => this.valueMultiple = res);
  }
  private _superNormalSelect() {
    this.form.controls['superDefualtSelect'].valueChanges.subscribe(res => this.valueNormal = res);
  }

   setValueMultiple() {
    this.form.controls['superMultipleSelect'].patchValue([
      {
        id: '1',
        title: 'Item 1',
      },
    ])
  }

}
