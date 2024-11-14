import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SmeModule } from '@goeko/store'
import { ButtonModule, CardProductComponent, GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardCleantechComponent } from './dashboard/dashboard-cleantech/dashboard-cleantech.component'
import { DashboardSmeComponent } from './dashboard/dashboard-sme.component'

@NgModule({
  declarations: [DashboardSmeComponent, DashboardCleantechComponent],
  imports: [CommonModule, DashboardRoutingModule, CardProductComponent, TranslateModule, ButtonModule, SmeModule, GoDateFormatPipe],
  providers: [],
})
export class DashboardModule {}
