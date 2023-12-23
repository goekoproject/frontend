import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerOverlayComponent } from './components/spinner-overlay.component';
import { SpinnerOverlayService } from './spinner-overlay.service';

@NgModule({
	declarations: [SpinnerOverlayComponent],
	imports: [CommonModule],
	providers: [SpinnerOverlayService],
})
export class SpinnerOverlayModule {}
