import { CommonModule } from '@angular/common'
import { Component, forwardRef, inject, input, output, signal } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { FILE_UPLOAD_CONFIG } from './file-upload-config'

@Component({
  selector: 'goeko-file-upload',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  private _config = inject(FILE_UPLOAD_CONFIG)
  private _translate = inject(TranslateService)

  showNameFile = input<boolean>(false)
  fileAdded = output<File | null>()
  fileRemoved = output<string>()
  file = signal<File | null>(null)
  documentData = signal<any>(null)
  isDragover = signal(false)
  error = signal<string | null>(null)
  disabled = signal(false)

  // ControlValueAccessor callbacks
  private onChange: (value: File | null) => void = () => {}
  private onTouched: () => void = () => {}

  get maxFileSizeBytes(): number {
    return this._config.maxFileSizeMB * 1024 * 1024
  }

  private _validateAndSetFile(file: File | null): void {
    if (!file) {
      this._clearFile()
      return
    }

    if (file.size > this.maxFileSizeBytes) {
      this.setError('INPUT_FILE.maxSizeFile', { size: this._config.maxFileSizeMB })
      return
    }

    this.file.set(file)
    this.clearError()
  }
  private _clearFile(): void {
    this.file.set(null)
    this.clearError()
    this.onChange(null)
    this.onTouched()
  }
  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    return this.error() ? { fileUpload: this.error() } : null
  }

  // ControlValueAccessor methods
  writeValue(value: File | null): void {
    if (value instanceof File) {
      this._validateAndSetFile(value)
    } else {
      this._validateAndSetFile(null)
      this.documentData.set(value)
    }
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  // File handling
  onFileChange(event: Event): void {
    if (this.disabled()) return
    const input = event.target as HTMLInputElement
    this.handleFile(input.files?.[0])
  }

  onFileDrop(event: DragEvent): void {
    if (this.disabled()) return
    event.preventDefault()
    this.isDragover.set(false)
    this.handleFile(event.dataTransfer?.files?.[0])
  }

  private handleFile(file?: File): void {
    if (!file) return

    if (file.size > this.maxFileSizeBytes) {
      this.setError('INPUT_FILE.maxSizeFile', { size: this._config.maxFileSizeMB })
      return
    }

    this.clearError()
    this.file.set(file)
    this.onChange(file)
    this.onTouched()
    this.fileAdded.emit(file)
  }

  private setError(translationKey: string, params?: any): void {
    this.error.set(this._translate.instant(translationKey, params))
    this.file.set(null)
    this.onChange(null)
    this.onTouched()
    this.fileAdded.emit(null)
  }

  private clearError(): void {
    this.error.set(null)
  }

  // Drag and drop
  onDragOver(event: DragEvent): void {
    if (this.disabled()) return
    event.preventDefault()
    this.isDragover.set(true)
  }

  onDragLeave(event: DragEvent): void {
    if (this.disabled()) return
    event.preventDefault()
    this.isDragover.set(false)
  }

  downloadFile() {
    const url = this.documentData()?.url
    if (url) {
      window.open(url, '_blank')
    }
  }
  removeFile() {
    this.fileRemoved.emit(this.documentData()?.id)
    this.documentData.set(null)
    this.onChange(null)
    this.onTouched()
  }
}
