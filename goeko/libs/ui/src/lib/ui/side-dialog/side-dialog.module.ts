import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SideDialogComponent } from './side-dialog.component'

@NgModule({
  imports: [CommonModule], // Update the imports array
  exports: [SideDialogComponent],
  declarations: [SideDialogComponent],
  providers: [],
})
export class SideDialogModule {}
