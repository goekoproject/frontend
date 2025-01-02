import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { AssetsContentFulPipe, ContentFulModule, ContentFulService } from '@goeko/store'
import { GoDateFormatPipe, MdToHtmlPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { HeaderService } from '../../header/header.services'

@Component({
  selector: 'goeko-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MdToHtmlPipe, ContentFulModule, GoDateFormatPipe, AssetsContentFulPipe],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  public blogPost: any
  private get _blogId() {
    return this._route?.snapshot.params?.['blogId']
  }

  constructor(
    private _route: ActivatedRoute,
    private _contentFulService: ContentFulService,
    private _headerService: HeaderService,
    private _router: Router
  ) {
    console.log('post', this._blogId)
  }

  ngOnInit(): void {
    this._setHeaderTheme();

    const blogId = this._blogId
    if (blogId) {
      this._contentFulService.getEntryId(blogId).subscribe((post) => {
        this.blogPost = post
      })
    }
  }

  goBack() {
    this._router.navigate(['home/blog'])
  }


  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(true);
  }
}
