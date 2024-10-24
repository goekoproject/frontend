import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ContentFulModule, ContentFulService } from '@goeko/store'
import { GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'
import { BlogPostComponent } from '../blog-post/blog-post.component'
import { HeaderService } from '../../header/header.services'

@Component({
  selector: 'goeko-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ContentFulModule, GoDateFormatPipe, BlogPostComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  public posts$ = this._contentFulService.getContentType('blog').pipe(map((posts) => posts.items))
  constructor(
    private _contentFulService: ContentFulService,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this._setHeaderTheme();
    this._setTopScroll();
  }

  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(true);
  }

  _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }
}
