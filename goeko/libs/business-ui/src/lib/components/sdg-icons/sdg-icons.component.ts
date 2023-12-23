import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ODS_CODE } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'goeko-sdg-icons',
  templateUrl: './sdg-icons.component.html',
  styleUrls: ['./sdg-icons.component.scss'],
})
export class SdgIconsComponent implements OnInit {
  public currentLangCode: string;
  public odsCode!: number[];
  @Input()
  public get selected(): number[] {
    return this._selected;
  }
  public set selected(sustainableDevelopmentGoals: number[]) {
    if (sustainableDevelopmentGoals) {
      this.odsCode = ODS_CODE.filter((code) =>
        sustainableDevelopmentGoals.includes(code)
      );
    }
    this._selected = sustainableDevelopmentGoals;
  }
  private _selected!: number[];

  constructor(private _translateServices: TranslateService) {
    this.currentLangCode = this._translateServices.defaultLang;
    this.odsCode = ODS_CODE;
  }

  ngOnInit(): void {
    this._changeLangCode();
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (res) => (this.currentLangCode = res.lang)
    );
  }
}
