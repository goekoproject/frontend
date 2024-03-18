import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-input-file',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
  public fileUrl!: string | undefined;

  @Input()
  public id!: string;

  private _loadFile = (event:EventTarget | DataTransfer | null) => {
    if(!event) {
      return null;
    }
    const file:File =((event as HTMLInputElement).files as FileList)[0];
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
  private _readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileUrl = event.target.result;
      this.fileChange.emit(file);
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(file);
  }
}
