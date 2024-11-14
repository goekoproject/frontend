import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  standalone: true,
  selector: 'goeko-blog',
  imports: [TranslateModule, RouterModule, CommonModule],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {}
