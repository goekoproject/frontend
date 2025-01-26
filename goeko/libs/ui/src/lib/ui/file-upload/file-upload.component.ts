import { CommonModule } from '@angular/common'
import { Component, inject, input, output, signal } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { FILE_UPLOAD_CONFIG } from './file-upload-config'

@Component({
  selector: 'goeko-file-upload',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  private _config = inject(FILE_UPLOAD_CONFIG)
  private _tranlate = inject(TranslateService)

  label = input<string>('FORM_LABEL.certificates')
  fileAdded = output<File>()

  file = signal<File | null>(null)
  isDragover = signal(false)
  error = signal<string | null>(null)
  showNameFile = signal(false)

  get maxFileSizeBytes(): number {
    return this._config.maxFileSizeMB * 1024 * 1024
  }

  private _validateFile(file: File) {
    if (file.size > this.maxFileSizeBytes) {
      const textError = this._tranlate.instant('INPUT_FILE.maxSizeFile', { size: this._config.maxFileSizeMB })
      this.error.set(textError)
      return false
    }
    return true
  }
  private validateAndEmit(file: File) {
    if (file.size > this.maxFileSizeBytes) {
      const textError = this._tranlate.instant('INPUT_FILE.maxSizeFile', { size: this._config.maxFileSizeMB })
      this.error.set(textError)
      this.file.set(null)
      return
    }

    this.error.set(null)
    this.file.set(file)
    this.fileAdded.emit(file) // Emitir el archivo válido
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) {
      return
    }
    this.validateAndEmit(file)
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault()
    this.isDragover.set(false)
    const file = event.dataTransfer?.files?.[0]
    if (!file) {
      return
    }
    this.validateAndEmit(file)
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
    this.isDragover.set(true)
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    this.isDragover.set(false)
  }
}
