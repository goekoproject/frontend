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
  signal
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

  @Input()
  public fileUrl!: string | Array<string>;

  @Input()
  public id!: string;

  @Input()
  multiple: boolean = false;

  selectedSlideMain = signal<number>(this._selectedSlideMain);

  private get _selectedSlideMain(): number{
    return this.emblaApi ?  this.emblaApi?.selectedScrollSnap() : 0
  }
  private _files = (
    event: EventTarget | DataTransfer | null
  ): FileList | File => {
    const files = (event as HTMLInputElement).files as FileList;
    return this.multiple ? files : files[0];
  };

  private _loadFile = (event: EventTarget | DataTransfer | null) => {
    if (!event) {
      return null;
    }
    const file = this._files(event);
    return file;
  };

  private get lastSlide() {
    if(!this.emblaApi) {
      return 0
    }
    return this.emblaApi?.slideNodes().length - 1
  }
  constructor(private _renderer: Renderer2) {}

  ngAfterViewInit() {
    const { emblaApi } = this.emblaRef;
    const { emblaApiThumb } = this.thumbRef;

    if (this.multiple) {
      this.emblaApi = emblaApi;
      this.thumbApi = emblaApiThumb;
      this.fileUrl = [];
    }
  }
  uploadFile(event: Event) {
    const file = this._loadFile(event.target) as File;
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
    const file = this._loadFile(event.dataTransfer) as File;
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
    this.thumbApi?.scrollNext();
  }
  prev() {
    this.thumbApi?.scrollPrev();
  }

  private _displayPreview() {
    this._renderer.addClass(this.dropzone.nativeElement, 'border-indigo-600');
  }
  private _setSelectedLastSlided() {
    if(this.multiple) {
      setTimeout(() => { 
        this.emblaApi?.scrollTo(this.lastSlide);
      })

    }
  }
  private _readFile(files: File | FileList) {
    if (this.multiple) {
      this._readFileMultifile(files as FileList);
    } else {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
        this.fileChange.emit(files);
      };
      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };
      const file = files as File;
      reader.readAsDataURL(file);
    }
  }

  private _readFileMultifile(files: FileList) {
    const fileList = files as FileList;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        (this.fileUrl as Array<string>).push(event.target.result as any);
        if (this.fileUrl?.length === files.length) {
          this.fileChange.emit(files); // Emitir todos los archivos cuando todos estén listos
        }
          if(files.length === 1) {
            this._setSelectedLastSlided();
           }
        
  
      };

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };
      reader.readAsDataURL(file);
    });
  }


}
