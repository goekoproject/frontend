/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'goeko-card-ecosolutions',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './card-ecosolutions.component.html',
  styleUrls: ['./card-ecosolutions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'card-ecosolutions',
  },
})
export class CardEcosolutionsComponent implements OnInit {
  private _products!: string[];

  @Input() solutionName: string = 'Vertua Ultra Zero';
  @Input()
  public get products(): string {
    return this._products.toString().replace(/,/g, ' · ');
  }
  public set products(value: string[]) {
    this._products = value;
  }

  @Input() sustainableDevelopmentGoals: number[] = [17, 9, 6];

  currentLangCode!: string;

  constructor(private _translateServices: TranslateService) {}

  ngOnInit(): void {
    this.currentLangCode = this._translateServices.defaultLang;
    this._changeLangCode();
  }

  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (res) => (this.currentLangCode = res.lang)
    );
  }
}
