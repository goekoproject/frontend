import { CommonModule } from '@angular/common'
import { Component, ComponentRef, inject, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NewUpdateGrouping } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AddCategorySubcategoryGroupComponent } from './add-category-subcategory-group.component'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { BasicInfoGroupingComponent } from './basic-info-grouping.component'

@Component({
  selector: 'goeko-new-grouping',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
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
    { title: 'Category and Subcategory', component: AddCategorySubcategoryGroupComponent },
    { title: 'Summary', component: undefined },
  ])
  currentStep = signal(0)
  classification = signal([])

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
    this._currentComponentRef.instance.beforeNext.subscribe((data: any) => this._beforeNext(data))
  }

  private _beforeNext = (data: any) => {
    console.log('data', data)
    this.classification.set(data)
  }
  nextStep(): void {
    this.selectStep(this.currentStep() + 1)
  }

  createGrouping() {
    const body: NewUpdateGrouping = {
      name: this.form.value.name || '',
      description: this.form.value.description || '',
      classification: this.classification(),
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
