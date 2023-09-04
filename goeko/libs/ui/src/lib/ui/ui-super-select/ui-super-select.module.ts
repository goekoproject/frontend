import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundSuperSelectComponent } from './playground-super-select/playground-super-select.component';
import { SelectCheckboxComponent } from './select-checkbox.component';
import { SuperOptionComponent } from './super-option/super-option.component';
import { SuperSelectComponent } from './super-select/super-select.component';

@NgModule({
	declarations: [SuperSelectComponent, SuperOptionComponent, PlaygroundSuperSelectComponent, SelectCheckboxComponent],
	imports: [CommonModule, OverlayModule, A11yModule, ReactiveFormsModule, FormsModule],
	exports: [SuperOptionComponent, SuperSelectComponent, PlaygroundSuperSelectComponent],
})
export class UiSuperSelectModule {}
