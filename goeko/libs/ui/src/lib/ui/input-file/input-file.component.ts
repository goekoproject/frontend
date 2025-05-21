import { CommonModule } from '@angular/common'
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, input, signal } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { EmblaCarouselDirective } from 'embla-carousel-angular'
import { ThumbCarrouselDirective } from './thumb-carrousel.directive'
@Component({
  selector: 'goeko-input-file',
  standalone: true,
  imports: [CommonModule, TranslateModule, EmblaCarouselDirective, ThumbCarrouselDirective],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
})
export class InputFileComponent {
  @ViewChild(EmblaCarouselDirective) emblaRef!: EmblaCarouselDirective
  @ViewChild(ThumbCarrouselDirective) thumbRef!: ThumbCarrouselDirective
  private get emblaApi() {
    return this.emblaRef?.emblaApi
  }
  private get thumbApi() {
    return this.thumbRef?.emblaApiThumb
  }

  @ViewChild('dropzone') dropzone!: ElementRef
  @Output() fileChange = new EventEmitter()
  @Input()
  public get acceptedFileTypes(): string {
    return this._acceptedFileTypes
  }
  public set acceptedFileTypes(value: string) {
    this._acceptedFileTypes = value
  }
  private _acceptedFileTypes = 'application/png, application/jpeg, application/jpg'

  @Input() readonly = false

  @Input()
  public get filesUrl(): Array<string> | string {
    return this._filesUrl
  }
  public set filesUrl(value: Array<string> | string) {
    if (value) {
      this._processFilesUrl(value)
    }
  }
  private _filesUrl: Array<string> | string = []

  @Input()
  public id!: string

  @Input()
  multiple = false

  @Input()
  label!: string

  textButton = input('INPUT_FILE.image2')
  selectedSlideMain = signal<number>(this._selectedSlideMain)

  private _processFilesUrl(value: string | string[]) {
    if (!Array.isArray(value)) {
      this._filesUrl = [value]
    } else {
      this._filesUrl = value
    }
    this.loadFilesFromUrls(this._filesUrl)
  }

  public get _selectedSlideMain(): number {
    return this.emblaApi ? this.emblaApi?.selectedScrollSnap() : 0
  }
  private _files = (event: EventTarget | DataTransfer | null): File[] => {
    const files = Array.from((event as HTMLInputElement).files as FileList) as File[]
    return this.multiple ? files : files
  }

  private _loadFile = (event: EventTarget | DataTransfer | null) => {
    if (!event) {
      return null
    }
    const file = this._files(event)
    return file
  }
  private _fileSetMultiple!: Array<File>

  private get lastSlide() {
    if (!this.emblaApi) {
      return 0
    }
    return this.emblaApi?.slideNodes().length - 1
  }
  constructor(private _renderer: Renderer2) {}

  uploadFile(event: Event) {
    const file = this._loadFile(event.target) as File[]
    this._readFile(file)
  }

  onDragOver(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this._displayPreview()
  }
  onDragLeave(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this._displayPreview()
  }
  onDrop(event: DragEvent) {
    event.preventDefault()
    const file = this._loadFile(event.dataTransfer) as File[]
    this._readFile(file)
    this._displayPreview()
  }

  selectedImg(index: number): void {
    this.emblaApi?.scrollTo(index)
    const previousScrollSnap = this.emblaApi?.selectedScrollSnap() as number
    this.thumbApi?.scrollTo(previousScrollSnap)
    this.selectedSlideMain.set(this._selectedSlideMain)
  }

  next() {
    const nextSlider = this._selectedSlideMain + 1
    this.selectedImg(nextSlider)
  }
  prev() {
    const prevSlider = this._selectedSlideMain - 1
    this.selectedImg(prevSlider)
  }

  removeSlide(id: number) {
    ;(this.filesUrl as Array<string>).splice(id, 1)
    this._fileSetMultiple?.splice(id, 1)
    this._propagateSelected()
  }

  removeFile(event: Event) {
    event.stopPropagation()
    this.filesUrl = []
    this._fileSetMultiple = []
    //this._propagateSelected()
  }

  private _displayPreview() {
    this._renderer.addClass(this.dropzone.nativeElement, 'border-indigo-600')
  }
  private _setSelectedLastSlided() {
    if (this.multiple) {
      setTimeout(() => {
        this.emblaApi?.scrollTo(this.lastSlide)
      })
    }
  }
  private _readFile(files: File[]) {
    if (this.multiple) {
      this._readFileMultifile(files)
    } else {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        this.filesUrl = event.target.result
        this.fileChange.emit(files)
      }
      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code)
      }
      const file = files[0]
      reader.readAsDataURL(file)
    }
  }

  private _readFileMultifile(files: File[]) {
    this._initFileSetMultiple(files)
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        const { result } = event.target
        this._addNewFile(result)
        this._propagateSelected()
        if (files.length === 1) {
          this._setSelectedLastSlided()
        }
      }

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code)
      }
      reader.readAsDataURL(file)
    })
  }

  private _initFileSetMultiple(files: File[]) {
    this._fileSetMultiple = this._fileSetMultiple ? [...files, ...this._fileSetMultiple] : [...files]
  }
  private _addNewFile(urlFile: string) {
    ;(this.filesUrl as Array<string>).push(urlFile)
    this.next()
    if (this.filesUrl?.length > 1) {
      this.selectedSlideMain.update((value) => value + 1)
    }
  }

  private _propagateSelected() {
    if (this.filesUrl?.length === this._fileSetMultiple.length) {
      this.fileChange.emit(this._fileSetMultiple) // Emitir todos los archivos cuando todos estén listos
    }
  }
  async loadFilesFromUrls(fileUrls: string[]) {
    const filePromises = fileUrls?.map(async (url) => {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop() || 'defaultName'
      return new File([blob], filename, { type: blob.type })
    })

    this._fileSetMultiple = await Promise.all(filePromises)
    this._propagateSelected()
    // Aquí tienes tus archivos cargados en `this.files` y puedes manejarlos como desees
  }
}
