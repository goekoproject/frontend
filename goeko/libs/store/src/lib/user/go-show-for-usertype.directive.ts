import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserType } from './user-type.constants';
import { UserContextService } from '@goeko/core';
import { Subscription, map, distinctUntilChanged, tap } from 'rxjs';

@Directive({ selector: '[goShowUserType]', standalone: true })
export class GoShowUserTypeDirective implements OnInit, OnDestroy {
  @Input('goShowUserType') allowedUserType!: UserType[];

  private sub?: Subscription;

  constructor(
    private userContextService: UserContextService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.sub = this.userContextService.userType
      .pipe(
        map((userType) =>
          Boolean(userType && this.allowedUserType.includes(userType))
        ),
        distinctUntilChanged(),
        tap((hasUserType) =>
          hasUserType
            ? this.viewContainerRef.createEmbeddedView(this.templateRef)
            : this.viewContainerRef.clear()
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
