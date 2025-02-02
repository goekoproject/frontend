import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
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
import { SelectCertificateService } from './select-certificate.service'

interface CertificateFormGroup {
  file: FormControl<File | null>
  documentType: FormControl<string | null>
}
@Component({
  selector: 'goeko-select-certificate',
  standalone: true,
  imports: [CommonModule, UiSuperSelectModule, TranslateModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SelectCertificateService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCertificateComponent),
      multi: true,
    },
  ],
  template: `
    @if (existsFile() && (certificates()?.length ?? 0) > 0) {
      <div class="h-full max-h-52 w-52 rounded-lg bg-white p-2 drop-shadow-md">
        <div class="flex w-full justify-end text-2xl text-primary-default">
          <i class="ti ti-trash-filled cursor-pointer transition-colors hover:text-primary-blueDark" (click)="removeFile()"></i>
        </div>
        <!-- title -->
        <h2 class="mb-4 rounded-sm bg-blueLightPastel p-2 text-base/10 font-semibold md:line-clamp-2">{{ fileName() }}</h2>

        <!-- Selector certificate -->
        <ui-super-select
          [formControl]="documentType"
          [placeholder]="'certified' | translate"
          [hasError]="this.hasError()"
          id="certificateType"
          name="certificateType">
          <super-option *ngFor="let option of certificates()" [value]="option.code">
            {{ option.name }}
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
  private _selectCertificateServices = inject(SelectCertificateService)

  private _formControlNameDirective!: NgControl

  certificates = toSignal(this._selectCertificateServices.getCertificates(), { initialValue: [] })

  // Control de formulario reactivo
  documentTypeControl = new FormGroup<CertificateFormGroup | null>({
    file: new FormControl<File | null>(null),
    documentType: new FormControl<string | null>(null, Validators.required),
  })

  private _value = signal<string | null>(null)
  private _file = signal<File | null>(null)
  private _filename = signal<string>('')
  emptySelectCertificate = signal(false)

  fileName = computed(() => this._file()?.name ?? this._filename())
  hasError = computed(() => this.emptySelectCertificate())
  get documentType() {
    return this.documentTypeControl.get('documentType') as FormControl<string>
  }
  get controlParent() {
    return this._controlContainer?.control as FormArray
  }

  existsFile = computed(() => !!this._file() || !!this._value())
  // Métodos de ControlValueAccessor
  onChange: any = () => {}
  onTouched: any = () => {}

  // Escuchar clics fuera del componente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this._elementRef?.nativeElement?.contains(event.target) && this.documentTypeControl.invalid) {
      this.emptySelectCertificate.set(this.documentTypeControl.touched && this.documentTypeControl.dirty)
    }
  }

  constructor() {
    effect(() => {
      if (this._file()) {
        this.documentTypeControl.get('file')?.setValue(this._file())
        this.documentType.markAsDirty()
        this.documentType.markAsTouched()
      }
    })
  }

  // Escuchar cambios en el control de formulario
  ngOnInit() {
    this._formControlNameDirective = this._injector.get(NgControl, null) as NgControl
    this.documentTypeControl.valueChanges.subscribe((value) => {
      this._value.set(value?.documentType ?? null)
      this.onChange(value)
      this.onTouched()
    })
  }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    if (!value) {
      return
    }
    this._asssingValue(value)
  }

  private _asssingValue(value: any) {
    if (value instanceof File) {
      this._file.set(value)
    } else {
      this._asssingValueDocumentType(value)
    }
  }

  private _asssingValueDocumentType(value: any) {
    if (!value?.documentType || !value?.name) {
      throw new Error('Document type (documentType) or name is missing')
    }
    this._file.set(null)
    this._filename.set(value?.name)
    this.documentTypeControl.get('documentType')?.reset(value?.documentType, { emitEvent: false })
    this.documentTypeControl.markAsPristine()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.documentTypeControl.disable() : this.documentTypeControl.enable()
  }

  removeFile() {
    this._file.set(null)
    this.documentTypeControl.patchValue(null)
    this.onChange()
    this._removeElementofArray()
  }

  private _removeElementofArray() {
    const index = this.controlParent.controls.findIndex((control: any) => control.name === this._formControlNameDirective?.name)
    this.controlParent.removeAt(index)
  }
}
