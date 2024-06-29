import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'go-toggle-switch',
  standalone: true,
  template: `
    <label class="relative inline-flex cursor-pointer items-center">
      <input id="switch" type="checkbox" class="peer sr-only" (change)="onToggle()" [checked]="checked" />
      <label for="switch" class="hidden"></label>
      <div
        class="peer h-6 w-11 rounded-full border bg-white after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
    </label>
  `,
})
export class ToggleSwitchComponent {
  @Input()
  public get checked(): boolean {
    return this._checked
  }
  public set checked(value: boolean) {
    this._checked = value
  }
  private _checked!: boolean

  @Output() checkedChange = new EventEmitter<boolean>()

  onToggle(): void {
    this.checked = !this.checked
    this.checkedChange.emit(this.checked)
  }
}
