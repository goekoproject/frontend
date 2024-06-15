import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SmeService } from '@goeko/store';

@Component({
  selector: 'goeko-data-admin',
  standalone: true,
  imports: [CommonModule],
  providers:[SmeService],
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.scss',
})
export class DataAdminComponent implements OnInit {

  //delcare var 
  public smeUsers: any[] = [];
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
  //TODO: contrustor(private _smeServices: SmeServices)
  constructor(private _smeServices: SmeService) { }

   /* define public var headers = [
                  {
                      title: '',
                      key: ''
                    },
                      {
                      title: '',
                      key: ''
                    }
          ]
                    
          on html 
          @for()  --> header.title | translate          
          
          */

          /*
           *  Para body
           *   @for() -->smeUsers
           * 
           * 
           */
  ngOnInit(): void {
    this._smeServices.getAllSmesData().subscribe( smeUsersData => {
      this.smeUsers = smeUsersData;
      console.log(smeUsersData);
    });
   
  }
   
}