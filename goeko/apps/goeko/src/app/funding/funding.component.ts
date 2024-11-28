import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'goeko-funding',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss',
})
export class FundingComponent {}
