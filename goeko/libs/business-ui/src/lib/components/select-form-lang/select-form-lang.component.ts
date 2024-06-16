import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { LANGS, Lang } from '@goeko/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'goeko-select-form-lang',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './select-form-lang.component.html',
  styleUrl: './select-form-lang.component.scss',
})
export class SelectFormLangComponent {
  private _translateServices = inject(TranslateService);
  @Input() defaultLang: string =
    this._translateServices.currentLang || this._translateServices.defaultLang;
  @Input() label: string = 'FORM_LABEL.labelSelectedFormLang';
  @Output() selected = new EventEmitter();
  public langs: Lang[] = LANGS;

  public selectedCodeLang = signal(this.defaultLang);

  selectLang(lang: Lang, index: number) {
    this.selectedCodeLang.set(lang.code);
    this.selected.emit({ ...lang, index });
  }
}
