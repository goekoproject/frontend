import { CommonModule } from '@angular/common'
import { Component, ComponentRef, inject, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NewUpdateGrouping } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AddCategorySubcategoryGroupComponent } from './add-category-subcategory-group.component'
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component'
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
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  @ViewChild('stepContainer', { read: ViewContainerRef, static: true })
  stepContainer!: ViewContainerRef
  steps = signal([
    { title: 'Create Name and Description', component: BasicInfoGroupingComponent },
    { title: 'Add Category and Subcategory', component: AddCategorySubcategoryGroupComponent },
  ])
  currentStep = signal(0)
  classification = signal([])
  groupingClassifications = signal<NewUpdateGrouping | null>(null)

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  private _currentComponentRef: ComponentRef<any> | undefined = undefined

  get _instanceBasicInfoGroupingComponent() {
    return this._currentComponentRef?.instance as BasicInfoGroupingComponent
  }
  get instanceAddCategorySubcategoryGroupComponent() {
    return this._currentComponentRef?.instance as AddCategorySubcategoryGroupComponent
  }
  get instaceAdminCategoriesComponent() {
    return this._currentComponentRef?.instance as AdminCategoriesComponent
  }

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
    this._instanceBasicInfoGroupingComponent.form = this.form
    this._getClassification()
  }

  private _getClassification() {
    if (!this.instanceAddCategorySubcategoryGroupComponent) return
    this.instanceAddCategorySubcategoryGroupComponent.beforeNext?.subscribe((data: any) => this._beforeNext(data))
  }

  private _beforeNext = (data: any) => {
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
    }

    this._adminCategoriesService.createGrouping(body).subscribe((grouping) => {
      if (grouping) {
        console.info('Grouping created')
        this._goGroupingHub()
      }
    })
  }
  private _goGroupingHub() {
    this._router.navigate(['grouping'], { relativeTo: this._route.parent })
  }
}
