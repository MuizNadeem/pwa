import { Device } from './../../Tracking/model/device';

import { DefaultService } from './../../Tracking/api/default.service';
// import * as API from './../../Tracking/api/api';

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( public authService: AuthService, private router: Router
     ,public track: DefaultService
  ) { }
  ngOnInit() {
    
console.log("hello");

 this.track.devicesGet().subscribe(truck=>{
   console.log(truck);
 });

  }

  

}
