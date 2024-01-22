import { Component, OnInit } from '@angular/core';
import { LoaderCircleComponent } from '../loader-animation/loader-circle/loader-circle.component';
import { LoadingGoekoervice } from './goeko-loading';

@Component({
  standalone: true,
  imports: [LoaderCircleComponent],
  selector: 'goeko-autenticate',
  templateUrl: './autenticate.html',
  styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
  constructor(private loadingGoekoervice: LoadingGoekoervice) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.loadingGoekoervice.startPlatform$ = true;
    }, 100);
  }
}
