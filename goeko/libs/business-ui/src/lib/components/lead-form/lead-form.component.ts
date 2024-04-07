import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  effect,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LeadCreate, LeadService, UserService } from '@goeko/store';
import {
  ButtonModule,
  DialogData,
  DialogMessageService,
  GoInputModule
} from '@goeko/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface LeadForm {
  message: any;
  email: any;
}
@Component({
  selector: 'goeko-lead-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoInputModule,
    TranslateModule,
    ButtonModule,
  ],
  providers: [LeadService],
  templateUrl: './lead-form.component.html',
  styleUrl: './lead-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadFormComponent implements OnInit {
  @Input() ecosolutionId!: string;
  @Input() cleantechId!: string;

  public leadForm!: FormGroup;
  private dataLead!: LeadCreate;

  get currentLang(): string {
    return (
      this._translateService.currentLang || this._translateService.defaultLang
    );
  }
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _translateService: TranslateService,
    private _leadService: LeadService,
    private _dialogMessage: DialogMessageService
  ) {
    effect(() => {
      if( this.leadForm) {
        this.leadForm.controls['email'].patchValue(this._userService.userProfile().email);

      }
    })
  }

  ngOnInit(): void {
    
    this._initForm();
    this._buildDataLead();
  }

  private _buildDataLead() {
    this.dataLead = {
      cleantechId: this.cleantechId,
      smeId: this._userService.userProfile().id,
      ecosolutionId: this.ecosolutionId,
      message: '',
      lang: this._translateService.currentLang,
    };
  }
  private _initForm() {
    this.leadForm = this._fb.group<LeadForm>({
      email: [],
      message: [
        this._translateService.instant('defaultMessageLead'),
        Validators.required,
      ],
    });
  }
  createLead() {
    if (!this.leadForm.valid) {
      return;
    }
    
    this._buildMessage();
    this._leadService.create(this.dataLead).subscribe(() => {
      this._dialogCreateLead();
    });
  }

  private _buildMessage() {
    this.dataLead = {
      ...this.dataLead,
      message: ` <b>${this._translateService.instant(
        'FORM_LABEL.email'
      )} :</b> ${this.leadForm.value.email};  <br> ${
        this.leadForm.value.message
      }`,
    };
  }

  private _dialogCreateLead() {
    const dataDialog = this._getDataDialog();
    this._dialogMessage.open(dataDialog);
  }
  private _getDataDialog(): DialogData {
    return {
      title: this._translateService.instant('DIALOG.messageSendOk'),
      body: this._translateService.instant('DIALOG.messageBodyLead'),
      buttonPrimary: this._translateService.instant('accept'),
    };
  }
}
