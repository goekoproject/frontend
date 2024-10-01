import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MessageService } from '@goeko/business-ui'
import { CleanTechService, CleantechsUser, EcosolutionsService, SmeService, SmeUser, USER_TYPE, UserService, UserType } from '@goeko/store'
import { DialogConfig, DialogMessageService, MESSAGE_TYPE } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { Observable, of, switchMap } from 'rxjs'
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
  providers: [SmeService, CleanTechService, MessageService, EcosolutionsService],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUserComponent {
  private _dataSourcesByUserType: DataSourcesByUserType = {
    sme: this._smeServices.getAllSmesData(),
    cleantech: this._cleantechServices.getAllCleantechData(),
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
    private _messageService: MessageService,
    private _userService: UserService,
    private _translateService: TranslateService,
    private _ecosolutionsService: EcosolutionsService,
    private _dialogMessageService: DialogMessageService,
  ) {}

  changeUserType(type: USER_TYPE): void {
    this.selectedUserType = type
    this.dataSources = this._dataSourcesByUserType[type as keyof DataSourcesByUserType] as Observable<SmeUser[] | CleantechsUser[]>
  }

  deleteUser(id: string): void {
    this._showDeleteWarning(id)
  }

  private _showDeleteWarning(id: string): void {
    this._messageService
      .deleteMessage(MESSAGE_TYPE.WARNING, `${id}`)
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
    this.hasEcosolutions(id).subscribe((hasNotEcosolutions) => {
      if (hasNotEcosolutions) {
        this._cleantechServices.deleteCleantechUser(id).subscribe(() => {
          this.dataSources = this._cleantechServices.getAllCleantechData()
        })
      }
    })
  }
  private hasEcosolutions(id: string) {
    return this._ecosolutionsService.getEcosolutionsByCleantechId(id).pipe(
      switchMap((ecosolutions) => {
        if (ecosolutions) {
          return this._dialogMessageService.open(this._getDataDialogError()).afterClosed()
        } else {
          return of(true)
        }
      }),
    )
  }
  private _getDataDialogError(): DialogConfig {
    return {
      body: this._translateService.instant('DIALOG.messageErrorDeleteCleantech'),
      buttonPrimary: this._translateService.instant('accept'),
    }
  }
}
