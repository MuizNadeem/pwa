import { TruckService } from './../shared/truck.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {

  constructor(public truckService: TruckService) {

  }

  ngOnInit() {
    this.resetForm();
  }
  onSubmit(truckForm: NgForm) {
    
    if (truckForm.value.$key == null)
      this.truckService.insertTruck(truckForm.value);
    else
      this.truckService.updateTruck(truckForm.value);
    this.resetForm(truckForm);
  }

  resetForm(truckForm?: NgForm) {
    if (truckForm != null)
      truckForm.reset();
    this.truckService.selectedTruck = {
      $key: null,
      truckNo: '',
      truckType: '',
      truckAlias: '',
      insuranceExpiresOn: '',
      fitnessExpiresOn: '',
      permit: ''

    }
  }

}
