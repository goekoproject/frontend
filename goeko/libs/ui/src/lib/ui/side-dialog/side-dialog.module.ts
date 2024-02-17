import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SideDialogService } from './side-dialog.services';
import { SideDialogComponent } from './side-dialog.component';

@NgModule({
  imports: [CommonModule],
  exports: [SideDialogComponent],
  declarations: [SideDialogComponent],
  providers: [SideDialogService],
})
export class SideDialogModule {}
