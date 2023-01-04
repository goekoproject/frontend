import { Component, Input, OnInit } from '@angular/core';
import { filter, map, of, switchMap } from 'rxjs';
import { HomeService } from '../home.service';
import { CONTENT } from './content.contants';
import * as AOS from 'aos';
@Component({
  selector: 'go-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  article: any;

  otherContent = false;
  @Input()
  public get body(): any {
    return this._body;
  }
  public set body(value) {
    const benefit = new Array<any>();

    value?.benefits
      ?.filter((entry: string) => entry)
      .map((entryId: any) =>
        this._searchEntry$(entryId).subscribe((res) => {
          benefit.push(res);
          this.article = { ...value, benefits: benefit };
        })
      );

    this._body = value;
  }
  private _body: any;

  public content = CONTENT;

  private _searchEntry$ = (entryId: any) => {
    console.log(entryId);
    return this._homeService
      .getEntry(entryId)
      .pipe(map((benefits: any) => this._buildBenefis(benefits)));
  };

  private _buildBenefis = (benefit: any) => {
    return {
      ...benefit.fields,
      media: benefit.fields.media.fields.file,
    };
  };
  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
