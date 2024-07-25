import { Component } from '@angular/core';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'goeko-blog',
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})

export class BlogComponent {

}
