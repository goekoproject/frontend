import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SwitchComponent } from './switch.component'

@NgModule({
  declarations: [SwitchComponent],
  imports: [CommonModule, FormsModule],
  exports: [SwitchComponent],
})
export class SwitchModule {}
