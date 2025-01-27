import { CommonModule } from '@angular/common'
import { Component, computed, forwardRef, OnInit, signal } from '@angular/core'
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms'
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
      <div class="max-h-52 h-full w-52 rounded-lg bg-white p-2 drop-shadow-md">
        <i class="ti ti-trash-filled flex w-full cursor-pointer justify-end text-2xl text-primary-default"></i>
        <!-- title -->
        <h2 class="md:line-clamp-2 mb-4 bg-blueLightPastel p-2 text-base/10 font-semibold rounded-sm">{{ fileName() }}</h2>

        <!-- Selector certificate -->
        <ui-super-select
          [formControl]="typeCertificate"
          [placeholder]="'certified' | translate"
          id="certificateType"
          name="certificateType">
          <super-option *ngFor="let option of certificates()" [value]="option">
            {{ option.keyLang | translate }}
          </super-option>
        </ui-super-select>
      </div>
    }
  `,
})
export class SelectCertificateComponent implements ControlValueAccessor, OnInit {
  certificates = signal<any>(null)

  // Control de formulario reactivo
  certificateControl = new FormGroup<CertificateFormGroup | null>({
    file: new FormControl<File | null>(null, Validators.required),
    typeCertificate: new FormControl<string | null>(null, Validators.required),
  })

  // Valor interno del componente
  private _value: string | null = null
  private _file!: File

  // Nombre del archivo para mostrar
  fileName = computed(() => this.certificateControl.value?.file?.name ?? '')

  get typeCertificate() {
    return this.certificateControl.get('typeCertificate') as FormControl<string>
  }

  existsFile = computed(() => !!this._file)
  // Métodos de ControlValueAccessor
  onChange: any = () => {}
  onTouched: any = () => {}

  // Escuchar cambios en el control de formulario
  ngOnInit() {
    this.certificateControl.valueChanges.subscribe((value) => {
      this._value = value?.typeCertificate ?? null
      this.onChange(value)
      this.onTouched()
    })
  }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    this._file = value
    this.certificateControl.setValue(
      {
        file: value,
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
}
