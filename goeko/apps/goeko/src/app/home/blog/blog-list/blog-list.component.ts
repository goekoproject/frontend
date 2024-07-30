import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ContentFulModule, ContentFulService } from '@goeko/store'
import { GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'
import { BlogPostComponent } from '../blog-post/blog-post.component'

@Component({
  selector: 'goeko-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ContentFulModule, GoDateFormatPipe, BlogPostComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent {
  public posts$ = this._contentFulService.getContentType('blog').pipe(map((posts) => posts.items))
  constructor(private _contentFulService: ContentFulService) {}
}
