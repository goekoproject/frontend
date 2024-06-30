import { setRemoteDefinitions } from '@nx/angular/mf';
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CleanTechService, SmeService, USER_TYPE, UserType } from '@goeko/store'
import { Observable } from 'rxjs'
import { DATA_ACTOR_SWITCH } from '../data-actors-switch.constants'
import { MessageService } from '@goeko/business-ui'
import { MESSAGE_TYPE } from '@goeko/ui';

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
  providers: [SmeService, CleanTechService],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUserComponent {
  private _dataSourcesByUserType: DataSourcesByUserType = {
    sme: this._smeServices.getAllSmesData(),
    cleantech: this._cleantechServices.getAllCleantechData(),
  }

  public get dataSources() {
    return this._dataSourcesByUserType[this.selectedUserType as keyof DataSourcesByUserType] as Observable<User[]>
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
    private _cleantechServices: CleanTechService,
    private MessageService: MessageService,
  ) {}



  changeUserType(type: USER_TYPE): void {
    this.selectedUserType = type
  }
  deleteUser(id: number): void {
    console.log('delete user', id)
    this.MessageService.deleteMessage(MESSAGE_TYPE.WARNING, `Usuario ${id}`).subscribe();
      switch(this.selectedUserType) {
        case USER_TYPE.SME:
          this._smeServices.deleteSmeUser(id).subscribe(() => {
            console.log(`Deleted SME user with ID ${id}`);
              // Aquí puedes agregar cualquier lógica adicional después de la eliminación, como actualizar la lista de usuarios
          }, error => {
            console.error(`Error deleting SME user with ID ${id}: `, error);
          });
          break;
        case USER_TYPE.CLEANTECH:
          this._cleantechServices.deleteCleantechUser(id).subscribe(() => {
            console.log(`Deleted Cleantech user with ID ${id}`);
              // Aquí puedes agregar cualquier lógica adicional después de la eliminación, como actualizar la lista de usuarios
          }, error => {
            console.error(`Error deleting Cleantech user with ID ${id}: `, error);
          });
          break;
        default:
          console.error(`Unsupported user type: ${this.selectedUserType}`);
      }
    }





    ///this.adminService.deleteUser(id, selectedUserType)
    // deleteUser(id, selectedUserType) {
    //switch(selectedUserType) { case return this._smeServices.deleteSme(id); case return this._cleantechServices.deleteCleantech(id); }

}
