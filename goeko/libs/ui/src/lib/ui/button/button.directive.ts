/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[go-button]',
  host: {
    class: 'go-button',
    '[attr.appearance]':'appearance'
  }
})
export class ButtonDirective {

  @Input('appearance')
  public get appearance(): 'transparent' | 'primary' | 'any' | null {
    return this._appearance;
  }
  public set appearance(value: 'transparent' | 'primary' | 'any' | null) {
    this._appearance = value;
  }
  private _appearance: 'transparent' | 'primary' | 'any' | null = 'primary';

 

}
