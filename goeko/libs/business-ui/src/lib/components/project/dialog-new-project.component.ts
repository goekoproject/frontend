import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DialogMessageModule } from '@goeko/ui';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';
import { ButtonModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'goeko-dialog-new-project',
  templateUrl: './dialog-new-project.component.html',
  styleUrls: ['./dialog-new-project.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, ButtonModule, DialogMessageModule]
})
export class DialogNewProjectComponent implements OnInit {
  public formProject!: FormGroup;

  constructor(
    private _dialogService: DialogService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this._createFormProject()
  }
  private _createFormProject() {
    this.formProject = this.fb.group({
      name: ['', [Validators.required]],
      locations: this.fb.array([this.createLocationField()], Validators.required)
    })
  }

  private createLocationField(): FormGroup {
    return this.fb.group({
      location: ['', [Validators.required, this.locationValidator]]
    })
  }

  private locationValidator(control: AbstractControl) {
    const locationValue = control.value || '';
    const [region, country] = locationValue.split(',').map((val: string) => val.trim());

    if (region && country) {
      return null;
    }
    return { invalidLocation: true };
  }

  public get locationsProject(): FormArray {
    return this.formProject.get('locations') as FormArray;
  }

  close() {
    this._dialogService.close();
  }

  onSubmitProject() {
    if (this.formProject.valid) {
      console.log('Valid form', this.formProject.value);
    } else {
      console.log('Invalid form');
    }
  }
}
