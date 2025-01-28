import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, forwardRef, HostListener, inject, Injector, input, OnInit, signal } from '@angular/core'
import {
  ControlContainer,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

interface CertificateFormGroup {
  file: FormControl<File | null>
  typeCertificate: FormControl<string | null>
}
@Component({
  selector: 'goeko-select-certificate',
  standalone: true,
  imports: [CommonModule, UiSuperSelectModule, TranslateModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCertificateComponent),
      multi: true,
    },
  ],
  template: `
    @if (existsFile()) {
      <div class="h-full max-h-52 w-52 rounded-lg bg-white p-2 drop-shadow-md">
        <div class="flex w-full justify-end text-2xl text-primary-default">
          <i class="ti ti-trash-filled cursor-pointer transition-colors hover:text-primary-blueDark" (click)="removeFile()"></i>
        </div>
        <!-- title -->
        <h2 class="mb-4 rounded-sm bg-blueLightPastel p-2 text-base/10 font-semibold md:line-clamp-2">{{ fileName() }}</h2>

        <!-- Selector certificate -->
        <ui-super-select
          [formControl]="typeCertificate"
          [placeholder]="'certified' | translate"
          [hasError]="this.hasError()"
          id="certificateType"
          name="certificateType">
          <super-option *ngFor="let option of certificates()" [value]="option">
            {{ option.keyLang | translate }}
          </super-option>
          <p errorBody>⚠️{{ 'ERRORS_FORM.SELECT_CERTIFICATE' | translate }}</p>
        </ui-super-select>
      </div>
    }
  `,
})
export class SelectCertificateComponent implements ControlValueAccessor, OnInit {
  private _controlContainer = inject(ControlContainer, { optional: true })
  private _injector = inject(Injector)
  private _elementRef = inject(ElementRef)

  private _formControlNameDirective!: NgControl

  certificates = input<any>([{ keyLang: 'Test', code: 'test' }])

  // Control de formulario reactivo
  certificateControl = new FormGroup<CertificateFormGroup | null>({
    file: new FormControl<File | null>(null, Validators.required),
    typeCertificate: new FormControl<string | null>(null, Validators.required),
  })

  private _value = signal<string | null>(null)
  private _file = signal<File | null>(null)
  emptySelectCertificate = signal(false)

  fileName = computed(() => this._file()?.name ?? '')
  hasError = computed(
    () =>
      this.emptySelectCertificate() ||
      (this.certificateControl.invalid && this.certificateControl.touched && this.certificateControl.dirty),
  )
  get typeCertificate() {
    return this.certificateControl.get('typeCertificate') as FormControl<string>
  }
  get controlParent() {
    return this._controlContainer?.control as FormArray
  }

  existsFile = computed(() => !!this._file())
  // Métodos de ControlValueAccessor
  onChange: any = () => {}
  onTouched: any = () => {}

  // Escuchar clics fuera del componente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this._elementRef?.nativeElement?.contains(event.target)) {
      this.emptySelectCertificate.set(true)
      // Aquí puedes ejecutar la lógica que desees cuando se hace clic fuera del componente
    }
  }

  // Escuchar cambios en el control de formulario
  ngOnInit() {
    this._formControlNameDirective = this._injector.get(NgControl, null) as NgControl
    this.certificateControl.valueChanges.subscribe((value) => {
      this._value.set(value?.typeCertificate ?? null)
      this.onChange(this._value())
      this.onTouched()
    })
  }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    this._file.set(value)
    this.certificateControl.setValue(
      {
        file: this._file(),
        typeCertificate: null,
      },
      { emitEvent: false },
    )
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.certificateControl.disable() : this.certificateControl.enable()
  }

  removeFile() {
    this._file.set(null)
    this.certificateControl.patchValue(null)
    this.onChange()
    this._removeElementofArray()
  }

  private _removeElementofArray() {
    const index = this.controlParent.controls.findIndex((control: any) => control.name === this._formControlNameDirective?.name)
    this.controlParent.removeAt(index)
  }
}
