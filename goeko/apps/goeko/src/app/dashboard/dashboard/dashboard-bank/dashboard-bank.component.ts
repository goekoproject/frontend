import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'goeko-dashboard-bank',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [

  ],
  templateUrl: './dashboard-bank.component.html',
  styleUrl: './dashboard-bank.component.scss',
})
export class DashboardBankComponent implements OnInit {

  constructor() {
    console.log ('Dashboard Bank')
  }
  ngOnInit(): void {
    console.log ('Dashboard Bank');
  }
}
