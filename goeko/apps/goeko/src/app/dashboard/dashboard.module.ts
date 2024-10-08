import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardSmeComponent } from './dashboard/dashboard-sme.component';
import { DashboardCleantechComponent } from './dashboard/dashboard-cleantech/dashboard-cleantech.component';
import { ButtonModule, GoDateFormatPipe } from '@goeko/ui';
import { SmeModule } from '@goeko/store';

@NgModule({
	declarations: [DashboardSmeComponent, DashboardCleantechComponent],
	imports: [CommonModule, DashboardRoutingModule, TranslateModule, ButtonModule, SmeModule, GoDateFormatPipe],
})
export class DashboardModule {}
