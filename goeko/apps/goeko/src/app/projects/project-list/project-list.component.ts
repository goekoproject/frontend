import { CommonModule } from '@angular/common'
import { Component, effect, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogNewProjectComponent, GoTableModule, MessageService, SplitCategoriesPipe } from '@goeko/business-ui'
import { NotificationSearch, Project } from '@goeko/store'
import { ButtonModule, DialogService, GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { ProjectManagmentService } from '../project-managment.service'
import { DisplayRegionsPipe } from './display-regions.pipe'

@Component({
  selector: 'goeko-project-list',
  standalone: true,
  imports: [CommonModule, GoTableModule, GoDateFormatPipe, DisplayRegionsPipe, TranslateModule, SplitCategoriesPipe, ButtonModule],
  providers: [ProjectManagmentService, MessageService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  private _projectServices = inject(ProjectManagmentService)
  private _dialogService = inject(DialogService)
  private _messageService = inject(MessageService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  public smeId = input<string>('')
  public displayColumns = ['FORM_LABEL.name', 'FORM_LABEL.location', 'FORM_LABEL.date', 'categories', '']

  public projects = this._projectServices.projects

  constructor() {
    effect(() => {
      if (this.smeId()) {
        this._fechProjects()
      }
    })
  }

  private _fechProjects() {
    this._projectServices.getProjects(this.smeId())
  }
  newProject() {
    this._dialogService
      .open(DialogNewProjectComponent)
      .afterClosed()
      .subscribe((newProject) => {
        this.goToEdit(newProject)
      })
  }
  goToDetail(project: Project) {
    this._router.navigate(['search', this.smeId(), project.id], { relativeTo: this._route.parent })
  }

  goToEdit(project: Project) {
    this._router.navigate(['project-form', this.smeId(), project.id], {
      relativeTo: this._route.parent,
    })
  }

  updateRecivedNotification(project: Project) {
    const notification: NotificationSearch = {
      onNewEcosolution: !project?.notification?.onNewEcosolution,
    }
    this._projectServices.updateProject(project.id, { ...project, notification }).subscribe(() => {
      this._fechProjects()
    })
  }
  deleteProject(project: Project) {
    this._messageService
      .deleteMessage(project.name)
      .afterClosed()
      .subscribe((isDelete) => {
        if (isDelete) {
          this._projectServices.deleteProject(project.id).subscribe(() => {
            this._fechProjects()
          })
        }
      })
  }
}
