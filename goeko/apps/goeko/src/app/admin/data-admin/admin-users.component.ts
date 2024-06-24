import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { SmeService, USER_TYPE, UserService, UserType } from '@goeko/store'
import { Observable } from 'rxjs'
import { DATA_ACTOR_SWITCH } from '../data-actors-switch.constants'

interface User {
  id: number
  name: string
  country: string
  email: string
  website: string
}
type DataSourcesByUserType = {
  [key in UserType]: Observable<unknown>
}
@Component({
  selector: 'goeko-data-admin',
  standalone: true,
  imports: [CommonModule],
  providers: [SmeService, UserService],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUserComponent implements OnInit {
  public dataSourcesByUserType: DataSourcesByUserType = {
    sme: this._smeServices.getAllSmesData(),
    cleantech: this._cleantechServices.getAllCleantechData(),
  }
  public smeUsers = this._smeServices.getAllSmesData()
  public cleantechUsers = this._cleantechServices.getAllCleantechData()

  public get dataSources() {
    return this.dataSourcesByUserType[this.selectedUserType as keyof DataSourcesByUserType] as Observable<User[]>
  }
  public headers: { title: string; key: keyof User }[] = [
    {
      title: 'NAME',
      key: 'name',
    },
    {
      title: 'EMAIL',
      key: 'email',
    },
    {
      title: 'COUNTRY',
      key: 'country',
    },
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'WEBSITE',
      key: 'website',
    },
  ]
  public dataActorSwitch = DATA_ACTOR_SWITCH
  public selectedUserType = USER_TYPE.SME

  constructor(
    private _smeServices: SmeService,
    private _cleantechServices: UserService,
  ) {}

  ngOnInit(): void {}

  changeUserType(type: USER_TYPE): void {
    this.selectedUserType = type
  }
}
