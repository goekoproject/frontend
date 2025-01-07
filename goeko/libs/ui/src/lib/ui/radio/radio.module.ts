import { NgModule } from '@angular/core'
import { RadioGroupComponent } from './radio-group.component'
import { RadioInputComponent } from './radio-input.component'

@NgModule({
  imports: [RadioGroupComponent, RadioInputComponent],
  exports: [RadioGroupComponent, RadioInputComponent],
})
export class RadioModule {}
