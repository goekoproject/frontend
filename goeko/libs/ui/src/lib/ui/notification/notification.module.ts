import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationComponent } from './notification.component';

@NgModule({
	declarations: [NotificationComponent],
	imports: [CommonModule, TranslateModule],
	exports: [NotificationComponent],
	
})
export class NotificationModule {}
