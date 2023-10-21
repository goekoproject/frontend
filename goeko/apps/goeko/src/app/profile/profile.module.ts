import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, GoInputModule, NotificationModule } from '@goeko/ui';
import { SideProfileComponent } from '@goeko/business-ui';

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		ReactiveFormsModule,
		TranslateModule,
		NotificationModule,
		ButtonModule,
		GoInputModule,
		SideProfileComponent,
	],
})
export class ProfileModule {}
