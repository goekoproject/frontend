import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@goeko/ui';

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule],
  providers: [

  ],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent implements OnInit {

  constructor() {
    console.log ('Hub Funding')
  }
  ngOnInit(): void {
    console.log ('Hub Funding');
  }
}
