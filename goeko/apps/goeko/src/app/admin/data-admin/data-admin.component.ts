import { DATA_ACTOR_SWITCH } from './../data-actors-switch.constants';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SmeService, USER_TYPE, UserService } from '@goeko/store';

interface User {
  id: number;
  name: string;
  country: string;
  email: string;
  website: string;
}

@Component({
  selector: 'goeko-data-admin',
  standalone: true,
  imports: [CommonModule],
  providers:[SmeService, UserService],
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.scss',
})
export class DataAdminComponent implements OnInit {

  public smeUsers: User[] = [];
  public cleantechUsers: User[] = [];
  public userType: USER_TYPE = USER_TYPE.SME;
  public headers = [
    {
      title: 'NAME',
      key: 'name'
    },
    {
      title: 'EMAIL',
      key: 'email'
    },
    {
      title: 'COUNTRY',
      key: 'country'
    },
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'WEBSITE',
      key: 'website'
    }
  ]
  public dataActorSwitch = DATA_ACTOR_SWITCH;
  public userTypes = USER_TYPE;

  constructor(
    private _smeServices: SmeService,
    private _cleantechServices:UserService
  ) { }

  ngOnInit(): void {
    this._smeServices.getAllSmesData().subscribe( smeUsersData => {
      this.smeUsers = smeUsersData;
    });

    this._cleantechServices.getAllCleantechData().subscribe( cleantechData => {
      this.cleantechUsers = cleantechData;
    });

  }

  changeUserType(type: USER_TYPE): void {
    this.userType = type;
  }

}
