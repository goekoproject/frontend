import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.services';
import { SideDialogComponent } from './side-dialog.component';

@NgModule({
  imports: [CommonModule],
  exports: [SideDialogComponent],
  declarations: [SideDialogComponent],
  providers: [DialogService],
})
export class SideDialogModule {}
