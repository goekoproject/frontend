import { DATA_ACTOR_SWITCH } from './../data-actors-switch.constants';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SmeService, UserService } from '@goeko/store';


@Component({
  selector: 'goeko-data-admin',
  standalone: true,
  imports: [CommonModule],
  providers:[SmeService, UserService],
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.scss',
})
export class DataAdminComponent implements OnInit {

  public smeUsers: any[] = [];
  public cleantechUsers: any[] = [];
  public headers = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'NAME',
      key: 'name'
    },
    {
      title: 'COUNTRY',
      key: 'country'
    },
    {
      title: 'EMAIL',
      key: 'email'
    },
    {
      title: 'WEBSITE',
      key: 'website'
    },
  ]
  public DATA_ACTOR_SWITCH = DATA_ACTOR_SWITCH;
  public userType: string = 'SME';

  constructor(private _smeServices: SmeService, private _cleantechServices:UserService) { }

  ngOnInit(): void {
    this._smeServices.getAllSmesData().subscribe( smeUsersData => {
      this.smeUsers = smeUsersData;
      console.log(smeUsersData);
    });

    this._cleantechServices.getAllCleantechData().subscribe( cleantechData => {
      this.cleantechUsers = cleantechData;
      console.log(cleantechData);
    });

  }

  changeUserType(type: string): void {
    this.userType = type;
  }

}
