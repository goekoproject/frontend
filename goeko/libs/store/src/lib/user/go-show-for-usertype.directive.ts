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
import { UserService } from './user.services';

@Directive({ selector: '[goShowUserType]', standalone: true })
export class GoShowUserTypeDirective implements OnInit, OnDestroy {
  @Input('goShowUserType') allowedUserType!: UserType[];

  private sub?: Subscription;

  constructor(
    private userServices: UserService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    const userType = this.userServices.userType();

    if (this.allowedUserType) {
      if (this.allowedUserType.includes(userType)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
