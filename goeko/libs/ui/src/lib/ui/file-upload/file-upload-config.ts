// file-upload.config.ts
import { InjectionToken } from '@angular/core'

export const FILE_UPLOAD_CONFIG = new InjectionToken<FileUploadConfig>('file-upload.config', {
  providedIn: 'root',
  factory: () => ({
    maxFileSizeMB: 10,
  }),
})

export interface FileUploadConfig {
  maxFileSizeMB: number
}
