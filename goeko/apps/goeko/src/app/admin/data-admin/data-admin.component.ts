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
  //TODO: contrustor(private _smeServices: SmeServices)

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

          /**
           *  Para body
           *   @for() -->smeUsers
           * 
           * 
           */
  ngOnInit(): void {
    //this._smeServices.getAll().subscribe( smeUsers => console.log(smeUsers));
  // create public var this.smeUser= smeUsers ( into suscribe)
  }
   //
}