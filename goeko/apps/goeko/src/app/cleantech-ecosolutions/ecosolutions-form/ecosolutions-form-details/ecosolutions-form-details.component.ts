import { CommonModule } from '@angular/common'
import { Component, computed, input, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormErrorTextComponent, GoInputComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor'
import { EDITOR_TOOLBAR_ECOSOLUTIONS } from '../editor-toolbar.constants'

@Component({
  selector: 'goeko-ecosolutions-form-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule, FormErrorTextComponent, GoInputComponent, TranslatePipe],
  templateUrl: './ecosolutions-form-details.component.html',
  styleUrl: './ecosolutions-form-details.component.scss',
})
export class EcosolutionsFormDetailsComponent implements OnInit, OnDestroy {
  parentForm = input.required<FormGroup>()
  isReadOnly = input<boolean>(false)
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS

  public selectedFormLang = computed(() => {
    return { code: 'fr', index: 0 }
  })
  public get descriptionTranslations(): FormArray {
    return this.parentForm().get('descriptionTranslations') as FormArray
  }
  public get nameTranslations(): FormArray {
    return this.parentForm().get('nameTranslations') as FormArray
  }
  public get detailedDescriptionTranslations(): FormArray {
    return this.parentForm().get('detailedDescriptionTranslations') as FormArray
  }
  public get priceDescriptionTranslations(): FormArray {
    return this.parentForm().get('priceDescriptionTranslations') as FormArray
  }
  public editor!: Editor

  ngOnInit(): void {
    this.editor = new Editor()
  }

  ngOnDestroy(): void {
    this.editor?.destroy()
  }
}
