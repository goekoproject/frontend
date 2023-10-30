import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, GoInputModule, NotificationModule, UiSuperSelectModule } from '@goeko/ui';
import { SideProfileComponent } from '@goeko/business-ui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
		UiSuperSelectModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
