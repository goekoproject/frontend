import { CommonModule } from '@angular/common'
import { Component, effect, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CategoryModule, SelectSubcategoryProductComponent } from '@goeko/business-ui'
import { Category, ProjectService } from '@goeko/store'
import { BadgeModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { tap } from 'rxjs'

@Component({
  selector: 'goeko-project-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, CategoryModule, BadgeModule, SelectSubcategoryProductComponent],
  providers: [ProjectService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  private _router = inject(ActivatedRoute)
  private _projectService = inject(ProjectService)
  private _fb = inject(FormBuilder)
  private _projectId = signal(this._router.snapshot.params['projectId'])
  private _smeId = signal(this._router.snapshot.params['smeId'])
  private loadFormEffect = effect(() => {
    if (this.project()) {
      this._initForm()
    }
  })
  public project = toSignal(
    this._projectService.getProjectId({ smeId: this._smeId(), projectId: this._projectId() }).pipe(
      tap((project) => {
        if (project) {
          this.loadFormEffect
        }
      }),
    ),
    {
      initialValue: null,
    },
  )

  public groupingForm = toSignal<Category[]>(
    this._projectService.getGroupingFormCategories().pipe(
      tap((categories) => {
        if (categories.length > 0) {
          this.categorySelected.set(categories[0])
        }
      }),
    ),
    {
      initialValue: null,
    },
  )

  public categorySelected = signal<Category | undefined>(undefined)
  public form!: FormGroup
  private _initForm() {
    this.form = this._fb.group({
      co2Emission: this._fb.group({}),
      waste: this._fb.group({}),
      waterConsumption: this._fb.group({}),
      hazardousProduct: this._fb.group({}),
      notification: this._fb.group({
        onNewEcosolution: this._fb.control(false),
      }),
    })
  }

  selectCategory(category: Category) {
    this.categorySelected.set(category)
  }
}
