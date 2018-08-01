import { DefaultService } from './../../Tracking/api/default.service';

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

private role;
  constructor( public auth: AuthService ) {
   
   }
  
  ngOnInit() { 
     console.log("testing");
    //  console.log(this.tracking.devicesGet);
   }


}
