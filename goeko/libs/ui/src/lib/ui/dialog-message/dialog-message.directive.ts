import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[goDialogContent]',
})
export class DialogContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[goDialogFooter]',
})
export class DialogFooterDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[goDialogHeader]',
})
export class DialogHeaderDirective {
  constructor(public tpl: TemplateRef<any>) {}
}