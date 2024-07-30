import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoDateFormatPipe } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, GoDateFormatPipe, TranslateModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  @Input() post: any;
}

