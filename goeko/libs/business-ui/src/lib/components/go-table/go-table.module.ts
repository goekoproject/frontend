import { NgModule } from '@angular/core';
import { GoTableComponent } from './go-table.component';
import { CommonModule } from '@angular/common';
import { GoCellRefDirective, GoElementActionDirective, GoHeaderRefDirective } from './go-table-ref.directive';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: [GoTableComponent, GoCellRefDirective,GoElementActionDirective,GoHeaderRefDirective],
    declarations: [GoTableComponent, GoCellRefDirective,GoElementActionDirective,GoHeaderRefDirective],
    providers: [],
})
export class GoTableModule { }
