import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-real-state-loan-form',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {

  constructor(
  ) {
    console.log('real state loan')
  }


  ngOnInit(): void {
    console.log('real state loan')
  }

}
