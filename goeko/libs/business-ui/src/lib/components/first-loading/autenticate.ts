import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject } from 'rxjs';
import { LoadDataUser } from '../../user/load-user-data.service';
import { LoaderCircleComponent } from '../loader-animation/loader-circle/loader-circle.component';
import { LoadingGoekoervice } from './goeko-loading';

@AutoUnsubscribe()
@Component({
  standalone: true,
  imports: [LoaderCircleComponent],
  selector: 'goeko-autenticate',
  templateUrl: './autenticate.html',
  styleUrls: ['./autenticate.scss'],
})
export class AutenticateComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private loadingGoekoervice: LoadingGoekoervice,
    private loadDataUser: LoadDataUser
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.loadDataUser.resolve().subscribe();
      this.loadingGoekoervice.startPlatform$ = true;
    }, 100);
  }
}