import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SmeModule } from '@goeko/store'
import { ButtonModule, CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { DashboardCleantechComponent } from './dashboard-cleantech/dashboard-cleantech.component'
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [DashboardCleantechComponent],
  imports: [CommonModule, DashboardRoutingModule, CardProductComponent, TranslateModule, ButtonModule, SmeModule],
  providers: [],
})
export class DashboardModule {}
