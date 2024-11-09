import { Component, effect, inject, input, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { SmeDashboard, SmeRequestResponse, SmeService, UserService } from '@goeko/store'
import { DialogService } from '@goeko/ui'

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  providers: [MessageService, SmeService],
})
export class DashboardSmeComponent {
  private _smeServices = inject(SmeService)
  private _userService = inject(UserService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _dialogService = inject(DialogService)

  public id = input<string>('')
  private dashboardData$ = this._smeServices.getDashboardData(this.id())

  public userProfile = this._userService.userProfile
  public summary!: Signal<SmeDashboard | undefined>

  constructor() {
    effect(() => {
      if (this.id()) {
        this.summary = toSignal(this._smeServices.getDashboardData(this.id()))
      }
    })
  }
  openNewProjectDialog() {
    this._dialogService
      .open(DialogNewProjectComponent)
      .afterClosed()
      .subscribe((newProject) => {
        this._goToProject(newProject)
      })
  }
  private _goToProject(projects: SmeRequestResponse) {
    this._router.navigate(['../project-form', this.userProfile().id, projects.id], {
      relativeTo: this._route.parent,
    })
  }
}
