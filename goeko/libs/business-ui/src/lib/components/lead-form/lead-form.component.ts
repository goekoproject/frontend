import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadCreate, LeadService, UserService } from '@goeko/store';
import { ButtonModule, GoInputModule } from '@goeko/ui';
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
    ButtonModule
  ],
  providers: [LeadService],
  templateUrl: './lead-form.component.html',
  styleUrl: './lead-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadFormComponent implements OnInit{

  @Input() ecosolutionId!: string;
  @Input() cleantechId!: string;

  public leadForm!: FormGroup;
  public email = this._userService.userProfile().email;
  private dataLead!: LeadCreate;

  
  get currentLang(): string { 
    return this._translateService.currentLang ||  this._translateService.defaultLang
  }
  constructor(private _fb: FormBuilder, 
    private _userService: UserService,
    private _translateService: TranslateService,
    private _leadService: LeadService) {}


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
      lang: this._translateService.currentLang
    }
  }
  private _initForm() {
    this.leadForm = this._fb.group<LeadForm>({
      email: [this.email],
      message: [ this._translateService.instant('defaultMessageLead'), Validators.required]
    })
  }
  createLead() {
    this._buildMessage();
    this._leadService.create(this.dataLead).subscribe(data => {
      console.log(data);
    })
  }

  private _buildMessage () {
    this.dataLead =  {...this.dataLead, message: ` <b>${this._translateService.instant('FORM_LABEL.email')} :</b> ${this.leadForm.value.email};  <br> ${this.leadForm.value.message};`};

  }

}
