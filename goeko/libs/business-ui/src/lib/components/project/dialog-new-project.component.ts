import { GoekoButtonComponent } from './../../../../../ui/src/lib/ui/goeko-button/goeko-button/goeko-button.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMessageModule, DialogService, DialogMessageComponent } from '@goeko/ui';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, GoekoButtonModule} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'goeko-dialog-new-project',
  templateUrl: './dialog-new-project.component.html',
  styleUrls: ['./dialog-new-project.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, ButtonModule]
})
export class DialogNewProjectComponent {
  formProject: FormGroup;

  constructor(private _dialogService: DialogService, private fb: FormBuilder) {
    this.formProject = this.fb.group({
      name: ['', [Validators.required]],
      locations: ['', Validators.required]
    })
  }

  close() {
    this._dialogService.close();
  }

  onSubmit() {
    if (this.formProject.valid) {
      console.log('Formulario válido:', this.formProject.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
