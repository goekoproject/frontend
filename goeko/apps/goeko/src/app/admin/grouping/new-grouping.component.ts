import { CommonModule } from '@angular/common'
import { Component, ComponentRef, inject, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NewUpdateGrouping } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { BasicInfoGroupingComponent } from './basic-info-grouping.component'

@Component({
  selector: 'goeko-new-grouping',
  standalone: true,
  imports: [CommonModule, BasicInfoGroupingComponent, TranslateModule, ButtonModule, AdminCategoriesComponent],
  templateUrl: './new-grouping.component.html',
  styleUrl: './new-grouping.component.scss',
  providers: [AdminCategoriesService],
})
export class NewGroupingComponent implements OnInit {
  private _adminCategoriesService = inject(AdminCategoriesService)
  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  stepContainer!: ViewContainerRef
  steps = signal([
    { title: 'Create Name and Description', component: BasicInfoGroupingComponent },
    { title: 'Category and Subcategory', component: AdminCategoriesComponent },
    { title: 'Summary', component: undefined },
  ])
  currentStep = signal(0)

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  })
  private _currentComponentRef: ComponentRef<any> | undefined = undefined

  ngOnInit() {
    this.selectStep(this.currentStep())
  }
  selectStep(index: number): void {
    this.currentStep.set(index)
    this.loadStepComponent()
  }

  private loadStepComponent(): void {
    if (this._currentComponentRef) {
      this._currentComponentRef.destroy()
    }
    const step = this.steps()[this.currentStep()]
    const componentType = step.component as any
    this._currentComponentRef = this.stepContainer?.createComponent(componentType)
    this._currentComponentRef.instance.form = this.form
  }

  nextStep(): void {
    this.selectStep(this.currentStep() + 1)
  }

  private _createGrouping() {
    const body: NewUpdateGrouping = {
      name: this.form.value.name || '',
      description: this.form.value.description || '',
      classification: [],
      /*   classification: this.categoriesSelected.map((category) =>
        CategoryMapper.mapCategoryToNewCategoryForGrouping(category),
      ) as NewCategoryForGrouping[], */
    }

    this._adminCategoriesService.createGrouping(body).subscribe((grouping) => {
      if (grouping) {
        console.log('Grouping created')
      }
    })
  }
}
