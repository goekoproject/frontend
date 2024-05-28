/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-select-i18n',
  templateUrl: './select-i18n.component.html',
  styleUrls: ['./select-i18n.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule,OverlayModule]
})
export class SelectI18nComponent implements OnInit {
  @Input() langs: any;
  @Input() defaultLang!: any;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  public isOpen = false;
  public selectedLand: any;

  ngOnInit(): void {
    this.selectedLand = this.defaultLang;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectedLang(lang: any) {
    this.onSelect.emit(lang);
    this.selectedLand = lang;
    this.isOpen = false;
  }
}
