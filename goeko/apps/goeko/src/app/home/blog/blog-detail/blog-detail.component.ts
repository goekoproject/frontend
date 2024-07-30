import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ContentFulService, ContentFulModule } from '@goeko/store'
import { GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'


@Component({
  selector: 'goeko-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ContentFulModule, GoDateFormatPipe],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  public blogPost: any;
  private get _blogId() {
    return this._route?.snapshot.params?.['blogId']
  }

  constructor(private _route: ActivatedRoute, private _contentFulService: ContentFulService) {
    console.log('post', this._blogId)

  }

  ngOnInit(): void {
    const blogId = this._blogId;
    if (blogId) {
      this._contentFulService.getEntryId(blogId).subscribe(post => {
        this.blogPost = post;
      });
    }
  }
}

