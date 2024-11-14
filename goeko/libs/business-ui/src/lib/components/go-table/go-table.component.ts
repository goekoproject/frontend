import { Component, ContentChild, ContentChildren, Input, QueryList } from '@angular/core'
import { GoCellRefDirective, GoElementActionDirective, GoHeaderRefDirective } from './go-table-ref.directive'

@Component({
  selector: 'goeko-go-table',
  templateUrl: './go-table.component.html',
  styleUrl: './go-table.component.scss',
})
export class GoTableComponent {
  @ContentChild(GoHeaderRefDirective) headers!: GoHeaderRefDirective

  @ContentChildren(GoCellRefDirective) cells!: QueryList<GoCellRefDirective>
  @ContentChildren(GoElementActionDirective) elementActions!: QueryList<GoElementActionDirective>

  @Input() dataSources!: any

  @Input() displayColumns!: Array<string | unknown>
}
