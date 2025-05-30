import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MessageService } from '@goeko/business-ui'
import { CleanTechService, CleantechsUser, SmeService, SmeUser, USER_TYPE, UserService, UserType } from '@goeko/store'
import { GoDateFormatPipe } from '@goeko/ui'
import { Observable, of } from 'rxjs'
import { DATA_ACTOR_SWITCH } from '../data-actors-switch.constants'
import { BankUser } from 'libs/store/src/lib/user/user-type/bank-user.model'

interface User {
  id: number
  name: string
  country: string
  email: string
  website: string
  creationDate: string
}
type DataSourcesByUserType = {
  [key in UserType]?: Observable<unknown>
}

const emptyUserBank: BankUser[] = [];

@Component({
  selector: 'goeko-data-admin',
  standalone: true,
  imports: [CommonModule, GoDateFormatPipe],
  providers: [SmeService, CleanTechService, MessageService],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUserComponent {

  private _dataSourcesByUserType: DataSourcesByUserType = {
    sme: this._smeServices.getAllSmesData(),
    cleantech: this._cleantechServices.getAllCleantechData(),
    bank: of(emptyUserBank)
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
    {
      title: 'CREATION DATE',
      key: 'creationDate',
    },
  ]

  public dataActorSwitch = DATA_ACTOR_SWITCH
  public selectedUserType = USER_TYPE.SME
  public get dataSources(): Observable<SmeUser[] | CleantechsUser[] | any> {
    return this._dataSources
  }

  public set dataSources(value: Observable<SmeUser[] | CleantechsUser[]>) {
    this._dataSources = value
  }

  private _dataSources = this._dataSourcesByUserType[this.selectedUserType as keyof DataSourcesByUserType] as Observable<
    SmeUser[] | CleantechsUser[]
  >

  public userProfile = this._userService.userProfile()

  constructor(
    private _smeServices: SmeService,
    private _cleantechServices: CleanTechService,
    private MessageService: MessageService,
    private _userService: UserService,
  ) {}

  changeUserType(type: USER_TYPE): void {
    this.selectedUserType = type
    this.dataSources = this._dataSourcesByUserType[type as keyof DataSourcesByUserType] as Observable<SmeUser[] | CleantechsUser[]>
  }
  deleteUser(id: string): void {
    this.MessageService.deleteMessage(`${id}`)
      .afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          switch (this.selectedUserType) {
            case USER_TYPE.SME:
              this._deleteSmeUser(id)
              return
            case USER_TYPE.CLEANTECH:
              this._deleteCleantechUser(id)
              return
            default:
              console.error(`Unsupported user type: ${this.selectedUserType}`)
          }
        }
      })
  }

  private _deleteSmeUser(id: string): void {
    this._smeServices.deleteSmeUser(id).subscribe(() => {
      this.dataSources = this._smeServices.getAllSmesData()
    })
  }

  private _deleteCleantechUser(id: string): void {
    this._cleantechServices.deleteCleantechUser(id).subscribe(() => {
      this.dataSources = this._cleantechServices.getAllCleantechData()
    })
  }
}
