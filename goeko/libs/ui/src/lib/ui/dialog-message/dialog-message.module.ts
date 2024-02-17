import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogMessageComponent } from './dialog-message.component';
import { DialogMessageService } from './dialog-message.service';
import { ButtonModule } from '../button/button.module';


@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [DialogMessageComponent],
    declarations: [DialogMessageComponent],
    providers: [DialogMessageService],
})
export class DialogMessageModule { }
