import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'goeko-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  private get _blogId() {
    return this._route?.snapshot.params?.['blogId']
  }
  constructor(private _route: ActivatedRoute) {
    console.log('post', this._blogId)
    
  }
}
