import { Component, OnInit } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs';
import { HomeService } from '../home.service';

@Component({
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  bodyFields: any;
  constructor(private _homeService: HomeService) {}

  private _buildDataLandingPage = (data?: any) => {
    return {
      ...data.fields,
      benefits: data.fields.benefits.content.map(
        (benefits: any) => benefits.data.target?.sys.id
      ),
    };
  };

  ngOnInit(): void {
    this._homeService
      .getContent()
      .pipe(
        distinctUntilChanged(),
        map((data) => this._buildDataLandingPage(data)),
        tap((res) => (this.bodyFields = res))
      )
      .subscribe();
  }
}
