import { TrackingService } from './../../Tracking/api/tracking.service';

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
     ,public track: TrackingService
  ) { }
  ngOnInit() {
    
 this.track.positionsGet()
 .subscribe(truck=>{
  console.log(truck[0]);
});

 this.track.devicesGet()
 .subscribe(truck=>{
   console.log(truck[0].name);
 });



  }

  

}
