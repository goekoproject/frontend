import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from '../button/button.module'
import { DialogMessageComponent } from './dialog-message.component'
import { DialogMessageService } from './dialog-message.service'
import { OverlayRefService } from './overlay-ref.service'

@NgModule({
  imports: [CommonModule, ButtonModule, TranslateModule],
  exports: [DialogMessageComponent],
  declarations: [DialogMessageComponent],
  providers: [DialogMessageService, OverlayRefService],
})
export class DialogMessageModule {}
