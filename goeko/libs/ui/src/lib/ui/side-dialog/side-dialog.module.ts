import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' // Add this line
import { SideDialogComponent } from './side-dialog.component'
import { SideDialogService } from './side-dialog.services'

@NgModule({
  imports: [CommonModule], // Update the imports array
  exports: [SideDialogComponent],
  declarations: [SideDialogComponent],
  providers: [SideDialogService],
})
export class SideDialogModule {}
