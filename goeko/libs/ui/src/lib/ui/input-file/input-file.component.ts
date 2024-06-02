import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  EmblaCarouselDirective
} from 'embla-carousel-angular';
@Component({
  selector: 'goeko-input-file',
  standalone: true,
  imports: [CommonModule, TranslateModule,EmblaCarouselDirective],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
})
export class InputFileComponent {

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
  public fileUrl!: string | undefined | Array<string>

  @Input()
  public id!: string;

  @Input()
  multiple: boolean = false;

  private _files = (event:EventTarget |  DataTransfer | null):FileList | File  => {
    const files = ((event as HTMLInputElement).files as FileList);
    return this.multiple ? files: files[0]
  }

  private _loadFile = (event:EventTarget | DataTransfer | null) => {
    if(!event) {
      return null;
    }
    const file = this._files(event);
    return  file;
  }
  constructor(private _renderer: Renderer2){}

  uploadFile(event: Event) {
    const file =this._loadFile(event.target) as File;
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
    const file =this._loadFile(event.dataTransfer) as File;
    this._readFile(file);
    this._displayPreview();
  }

  private _displayPreview() {
    this._renderer.addClass(this.dropzone.nativeElement, 'border-indigo-600');

  }
  private _readFile(files: File | FileList) {
    if(this.multiple) {
      this._readFileMultifile(files as FileList);
    } else {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
        this.fileChange.emit(files);
      };
      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      const file = files as File;
        reader.readAsDataURL(file);
    }



  }

  private _readFileMultifile(files: FileList) {
    const fileList  = files as FileList; 
    this.fileUrl  = []

    Array.from(fileList).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        (this.fileUrl as Array<string>).push(event.target.result as any);
        if (this.fileUrl?.length === files.length) { 
          console.log(this.fileUrl);
          this.fileChange.emit(files); // Emitir todos los archivos cuando todos estén listos
        }
      };

      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };

    
        reader.readAsDataURL(file);

      })
    
  }
}
