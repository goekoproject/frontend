import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AssetsContentFulPipe } from '@goeko/store'
import { GoDateFormatPipe, MdToHtmlPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, GoDateFormatPipe, TranslateModule, AssetsContentFulPipe, MdToHtmlPipe],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent {
  @Input() post: any
}
