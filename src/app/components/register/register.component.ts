import { Component, OnInit } from '@angular/core';
import { TruckService } from "./shared/truck.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers :[TruckService]
})
export class RegisterComponent implements OnInit {

  constructor(private truckService : TruckService) { }

  ngOnInit() {}
   

 

}
