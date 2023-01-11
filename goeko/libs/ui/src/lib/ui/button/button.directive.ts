/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive, Input } from '@angular/core';

type appearance = 'transparent' | 'primary' | 'white' | 'any' | null;
@Directive({
  selector: '[go-button]',
  host: {
    class: 'go-button',
    '[attr.appearance]':'appearance'
  }
})
export class ButtonDirective {

  @Input('appearance')
  public get appearance():appearance  {
    return this._appearance;
  }
  public set appearance(value: appearance) {
    this._appearance = value;
  }
  private _appearance!: appearance

 

}
