import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProjectPayload, ProjectService, UserService } from '@goeko/store'
import { ButtonModule, DialogMessageModule, DialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { SelectLocationsComponent } from '../select-locations/select-locations.component'
@Component({
  selector: 'goeko-dialog-new-project',
  templateUrl: './dialog-new-project.component.html',
  styleUrls: ['./dialog-new-project.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, ButtonModule, DialogMessageModule, SelectLocationsComponent],
})
export class DialogNewProjectComponent implements OnInit {
  public formProject!: FormGroup

  public get locationsArrays(): FormArray {
    return this.formProject.get('locations') as FormArray
  }

  private _smeId = this._userServices.userProfile()?.id
  constructor(
    private _dialogService: DialogService,
    private _projectService: ProjectService,
    private _userServices: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this._createFormProject()
  }
  private _createFormProject() {
    this.formProject = this.fb.group({
      name: ['', [Validators.required]],
      locations: this.fb.array([], Validators.required),
    })
  }

  close() {
    this._dialogService.close()
  }

  onSubmitProject() {
    if (this.formProject.valid) {
      this._createProject()
    } else {
      console.log('Invalid form')
    }
  }

  private _createProject() {
    const payload = { ...this.formProject.value, smeId: this._smeId }
    this._projectService.saveProject(new ProjectPayload(payload)).subscribe((res) => {
      if (res) {
        this._dialogService.close(res)
      }
    })
  }
}
