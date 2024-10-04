import { CommonModule } from '@angular/common'
import { Component, effect, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogNewProjectComponent, GoTableModule, SplitCategoriesPipe } from '@goeko/business-ui'
import { NotificationSearch, Project, ProjectService } from '@goeko/store'
import { DialogService, GoDateFormatPipe } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-project-list',
  standalone: true,
  imports: [CommonModule, GoTableModule, GoDateFormatPipe, TranslateModule, SplitCategoriesPipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  private _projectServices = inject(ProjectService)
  private _dialogService = inject(DialogService)

  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  public smeId = input<string>('')
  public displayColumns = ['name', 'date', 'classifications']

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
    this._projectServices.setProjectQuery(project)
    this._router.navigate(['search', this.smeId(), project.id], { relativeTo: this._route.parent })
  }

  goToEdit(project: Project) {
    this._router.navigate(['project-form', this.smeId(), project.id], {
      relativeTo: this._route.parent,
      queryParams: {
        projectId: project.id,
      },
    })
  }
  deleteProject(project: Project) {
    this._projectServices.deleteProject(project.id).subscribe(() => {
      this._fechProjects()
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
}
