/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input, TemplateRef } from '@angular/core';


@Directive({ selector: '[goHeaderRef]' })
export class GoHeaderRefDirective {
    @Input('goHeaderRef') goHeaderRef!: Array<string>;
    public id =  window.crypto.randomUUID();
    constructor(public template: TemplateRef<any>) {
     }
}

@Directive({ selector: '[goCellRef]' })
export class GoCellRefDirective {
    public id =  window.crypto.randomUUID();
    constructor(public template: TemplateRef<any>) {
     }
}

@Directive({ selector: '[goElementAction]' })
export class GoElementActionDirective {
    public id =  window.crypto.randomUUID();
    constructor(public template: TemplateRef<any>) {
    }
}