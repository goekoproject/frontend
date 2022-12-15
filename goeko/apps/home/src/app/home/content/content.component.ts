import { Component, OnInit } from '@angular/core';
import { CONTENT } from './content.contants';

@Component({
  selector: 'go-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public content = CONTENT;
  constructor() {}

  ngOnInit(): void {}
}
