import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SideProfileComponent } from '@goeko/business-ui';
import { ButtonModule, GoInputModule, InputFileComponent, NotificationModule, UiSuperSelectModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		InputFileComponent,
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
