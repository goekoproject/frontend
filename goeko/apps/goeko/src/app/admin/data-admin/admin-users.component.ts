import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MessageService } from '@goeko/business-ui'
import { CleanTechService, CleantechsUser, SmeService, SmeUser, USER_TYPE, UserService, UserType } from '@goeko/store'
import { DialogConfig, DialogMessageService, MESSAGE_TYPE } from '@goeko/ui'
import { Observable } from 'rxjs'
import { DATA_ACTOR_SWITCH } from '../data-actors-switch.constants'
import { TranslateService } from '@ngx-translate/core'
import { EcosolutionsService } from '@goeko/store'

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
  providers: [SmeService, CleanTechService, MessageService],
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
    private MessageService: MessageService,
    private _userService: UserService,
    private _translateService: TranslateService,
    private _ecosolutionsService: EcosolutionsService,
    private _dialogMessageService: DialogMessageService
  ) {}

  changeUserType(type: USER_TYPE): void {
    this.selectedUserType = type
    this.dataSources = this._dataSourcesByUserType[type as keyof DataSourcesByUserType] as Observable<SmeUser[] | CleantechsUser[]>
  }

  deleteUser(id: string): void {
    if (this.selectedUserType === USER_TYPE.CLEANTECH) {
      console.log('ID user Cleantech:', id);
      this._ecosolutionsService.getEcosolutionsByCleantechId(id).subscribe(
        (ecosolutions: any[]) => {
          if (ecosolutions && ecosolutions.length > 0) {
            this._dialogMessageService.open(this._getDataDialogError());
          } else {
            this._showDeleteWarning(id);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this._showDeleteWarning(id);
    }
  }

  private _getDataDialogError(): DialogConfig {
    return {
      body: this._translateService.instant('DIALOG.messageErrorDeleteCleantech'),
      buttonPrimary: this._translateService.instant('accept'),
    };
  }

  private _showDeleteWarning(id: string): void {
    this.MessageService.deleteMessage(MESSAGE_TYPE.WARNING, `${id}`)
      .afterClosed()
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          switch (this.selectedUserType) {
            case USER_TYPE.SME:
              this._deleteSmeUser(id);
              return;
            case USER_TYPE.CLEANTECH:
              this._deleteCleantechUser(id);
              return;
            default:
              console.error(`Unsupported user type: ${this.selectedUserType}`);
          }
        }
      });
  }

  private _deleteSmeUser(id: string): void {
    this._smeServices.deleteSmeUser(id).subscribe(() => {
      this.dataSources = this._smeServices.getAllSmesData()
    })
  }

  private _deleteCleantechUser(id: string): void {
    this._cleantechServices.deleteCleantechUser(id).subscribe(() => {
      this.dataSources = this._cleantechServices.getAllCleantechData();
    })
  }
}
