import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { UserContextService } from '../user-context/user-context.service';
import { ROLES, UserRoles } from './role-type.model';
import { handleRoles } from './has-role-factory';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[goShowForRoles]',
  standalone: true,
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('goShowForRoles') allowedRoles?: UserRoles[] = [ROLES.PUBLIC];
  private sub?: Subscription;

  constructor(
    private userContextService: UserContextService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.sub = this.userContextService.userRole
      .pipe(
        map((userRole) => handleRoles(userRole, this.allowedRoles)),
        distinctUntilChanged(),
        tap((hasRole) =>
          hasRole
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
