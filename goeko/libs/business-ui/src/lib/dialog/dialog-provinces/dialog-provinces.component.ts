import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional, ViewEncapsulation, signal } from '@angular/core';
import { ElementLocation, SmeCountry } from '@goeko/store';
import { DialogService, OVERLAY } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-dialog-provinces',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dialog-provinces.component.html',
  styleUrl: './dialog-provinces.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'dialog-provinces'
  }
})
export class DialogProvincesComponent implements OnInit {

  public country = signal<SmeCountry | null>(null);
  public provinces = signal<Array<ElementLocation>>([]);
  constructor(
    @Optional() @Inject(OVERLAY) public data: any,
    private _dialogService: DialogService
  ){}

  ngOnInit() {
    console.log(this.data);
      const {country , provinces} = this.data;
      this.country.set(country) ;
      this.provinces.set(provinces);    
  }
  close() {
    this._dialogService.close();
  }
}
