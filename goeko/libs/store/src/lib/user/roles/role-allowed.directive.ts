import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  effect,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.services';
import { handleRoles } from './has-role-factory';
import { UserRoles } from './role-type.model';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[goShowForRoles]',
  standalone: true,
})
export class ShowForRolesDirective implements OnDestroy {
  @Input('goShowForRoles') allowedRoles!: UserRoles[] | undefined;
  private subscription?: Subscription;

  constructor(
    private userServices: UserService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    effect(() => {
      if (this.userServices.userRoles()) {
        this._handlerElement();
      }
    });
  }

  private _handlerElement() {
    this.viewContainerRef.clear();
    const userRoles = this.userServices.userRoles();

    if (handleRoles(userRoles, this.allowedRoles)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
