import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { DialogService } from './dialog.services';
import { isObjectEmpty } from '@goeko/core';
@Component({
  selector: 'goeko-side-dialog',
  templateUrl: './side-dialog.component.html',
  styleUrl: './side-dialog.component.scss',
})
export class SideDialogComponent implements OnDestroy {
  @ViewChild('sideBar') sideBar!: ElementRef<HTMLDialogElement>;
  @ViewChild('componenteRef', { static: true, read: ViewContainerRef })
  componenteRef!: ViewContainerRef;

  dialog = this._dialogService.dialog;
  private _config = this._dialogService.config;
  component!: ComponentRef<any>;
  constructor(private _dialogService: DialogService) {
    effect(() => {
      this._createComponent();
      this._toggleDialog();
    });
  }

  ngOnDestroy(): void {
    this.componenteRef.clear();
    this.componenteRef.detach();
  }
  private _createComponent() {
    this.componenteRef.clear();

    if (!this.dialog()?.component || isObjectEmpty(this.dialog()?.component)) {
      return;
    }
    this.component = this.componenteRef.createComponent(
      this.dialog().component,
      {
        injector: this._config().injector,
      }
    );
  }
  private _toggleDialog() {
    if (this.dialog().open) {
      this.sideBar.nativeElement.showModal();
    } else {
      this.sideBar.nativeElement.close();
    }
  }

  closeDialog() {
    this.sideBar.nativeElement.addEventListener(
      'animationend',
      (e: AnimationEvent) => {
        if (e.animationName.includes('slideOut')) {
          this._dialogService.closeDialog();
          this.sideBar.nativeElement.removeAttribute('closing');
        }
      },
      { once: true }
    );
    this.sideBar.nativeElement.setAttribute('closing', 'true');
  }
}
