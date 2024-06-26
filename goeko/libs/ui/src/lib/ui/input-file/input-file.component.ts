import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  EmblaCarouselDirective,
  EmblaCarouselType,
} from 'embla-carousel-angular';
import { ThumbCarrouselDirective } from './thumb-carrousel.directive';
@Component({
  selector: 'goeko-input-file',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EmblaCarouselDirective,
    ThumbCarrouselDirective,
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
})
export class InputFileComponent implements AfterViewInit {
  @ViewChild(EmblaCarouselDirective) emblaRef!: EmblaCarouselDirective;
  @ViewChild(ThumbCarrouselDirective) thumbRef!: ThumbCarrouselDirective;
  private emblaApi?: EmblaCarouselType;
  private thumbApi?: EmblaCarouselType;

  @ViewChild('dropzone') dropzone!: ElementRef;
  @Output() fileChange = new EventEmitter();
  @Input()
  public get acceptedFileTypes(): string {
    return this._acceptedFileTypes;
  }
  public set acceptedFileTypes(value: string) {
    this._acceptedFileTypes = value;
  }
  private _acceptedFileTypes: string = 'application/jpeg';

  @Input() readonly = false;

  @Input()
  public get filesUrl(): Array<string> | string | undefined {
    return this._filesUrl;
  }
  public set filesUrl(value: Array<string> | string | undefined) {
    if (!value) {
      return;
    }
    this._processFilesUrl(value);
  }
  private _filesUrl?: Array<string> | string | undefined = [];

  @Input()
  public id!: string;

  @Input()
  multiple: boolean = false;

  @Input()
  label!: string;

  selectedSlideMain = signal<number>(this._selectedSlideMain);

  private _processFilesUrl(value: string | string[]) {
    if (!Array.isArray(value)) {
      this._filesUrl = [value];
    } else {
      this._filesUrl = value;
    }
    this.loadFilesFromUrls(this._filesUrl);
  }

  private get _selectedSlideMain(): number {
    return this.emblaApi ? this.emblaApi?.selectedScrollSnap() : 0;
  }
  private _files = (event: EventTarget | DataTransfer | null): File[] => {
    const files = Array.from(
      (event as HTMLInputElement).files as FileList,
    ) as File[];
    return this.multiple ? files : files;
  };

  private _loadFile = (event: EventTarget | DataTransfer | null) => {
    if (!event) {
      return null;
    }
    const file = this._files(event);
    return file;
  };
  private _fileSetMultiple!: Array<File>;

  private get lastSlide() {
    if (!this.emblaApi) {
      return 0;
    }
    return this.emblaApi?.slideNodes().length - 1;
  }
  constructor(private _renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.multiple) {
      const { emblaApi } = this.emblaRef;
      const { emblaApiThumb } = this.thumbRef;
      this.emblaApi = emblaApi;
      this.thumbApi = emblaApiThumb;
    }
  }
  uploadFile(event: Event) {
    const file = this._loadFile(event.target) as File[];
    this._readFile(file);
  }

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this._displayPreview();
  }
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this._displayPreview();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = this._loadFile(event.dataTransfer) as File[];
    this._readFile(file);
    this._displayPreview();
  }

  selectedImg(index: number): void {
    this.emblaApi?.scrollTo(index);
    const previousScrollSnap = this.emblaApi?.selectedScrollSnap() as number;
    this.thumbApi?.scrollTo(previousScrollSnap);
    this.selectedSlideMain.set(this._selectedSlideMain);
  }

  next() {
    const next = this._selectedSlideMain + 1;
    this.selectedImg(next);
  }
  prev() {
    const prev = this._selectedSlideMain - 1;
    this.selectedImg(prev);
  }

  removeSlide(id: number) {
    (this.filesUrl as Array<string>).splice(id, 1);
    this._fileSetMultiple.splice(id, 1);
    this._propagateSelected();
  }

  private _displayPreview() {
    this._renderer.addClass(this.dropzone.nativeElement, 'border-indigo-600');
  }
  private _setSelectedLastSlided() {
    if (this.multiple) {
      setTimeout(() => {
        this.emblaApi?.scrollTo(this.lastSlide);
      });
    }
  }
  private _readFile(files: File[]) {
    if (this.multiple) {
      this._readFileMultifile(files);
    } else {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.filesUrl = event.target.result;
        this.fileChange.emit(files);
      };
      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };
      const file = files[0];
      reader.readAsDataURL(file);
    }
  }

  private _readFileMultifile(files: File[]) {
    this._initFileSetMultiple(files);
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const { result } = event.target;
        this._addNewFile(result);
        this._propagateSelected();
        if (files.length === 1) {
          this._setSelectedLastSlided();
        }
      };

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };
      reader.readAsDataURL(file);
    });
  }

  private _initFileSetMultiple(files: File[]) {
    this._fileSetMultiple = this._fileSetMultiple
      ? [...files, ...this._fileSetMultiple]
      : [...files];
  }
  private _addNewFile(urlFile: string) {
    (this.filesUrl as Array<string>).push(urlFile);
  }

  private _propagateSelected() {
    if (this.filesUrl?.length === this._fileSetMultiple.length) {
      this.fileChange.emit(this._fileSetMultiple); // Emitir todos los archivos cuando todos estén listos
    }
  }
  async loadFilesFromUrls(fileUrls: string[]) {
    const filePromises = fileUrls.map(async (url) => {
      const secureUrl = url.startsWith('https')
        ? url
        : `https://${url.split('//').pop()}`;
      const response = await fetch(secureUrl);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'defaultName';
      return new File([blob], filename, { type: blob.type });
    });

    this._fileSetMultiple = await Promise.all(filePromises);
    this._propagateSelected();
    // Aquí tienes tus archivos cargados en `this.files` y puedes manejarlos como desees
  }
}
