import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Truck } from './truck.model';

@Injectable()
export class TruckService {

  
  truckList: AngularFireList<any>;
  selectedTruck: Truck = new Truck();
  constructor(private firebase :AngularFireDatabase ) { }
 
  getData(){
    this.truckList = this.firebase.list('trucks');
    return this.truckList;
  }
 
  insertTruck(truck : Truck)
  {
    this.truckList.push({
      truckNo : truck.truckNo,
      truckType : truck.truckType,
      truckAlias : truck.truckAlias,
      insuranceExpiresOn : truck.insuranceExpiresOn,
      fitnessExpiresOn: truck.fitnessExpiresOn,
      permit : truck.permit
    });
  }
 
  updateTruck(truck : Truck){
    console.log("updating truck details");
    this.truckList.update(truck.$key,
      {
        truckNo : truck.truckNo,
        truckType : truck.truckType,
        truckAlias : truck.truckAlias,
        insuranceExpiresOn : truck.insuranceExpiresOn,
        fitnessExpiresOn: truck.fitnessExpiresOn,
        permit : truck.permit
      });
  }
 
  deleteTruck($key : string){
    this.truckList.remove($key);
  }

}
