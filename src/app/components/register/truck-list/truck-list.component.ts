import { Truck } from './../shared/truck.model';
import { Component, OnInit } from '@angular/core';
import { TruckService } from './../shared/truck.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {

  truckList : Truck[];
  constructor(private truckService : TruckService) { }

  ngOnInit() {
    var x = this.truckService.getData();
    x.snapshotChanges().subscribe(item => {
      this.truckList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.truckList.push(y as Truck);
      });
    });
  }

  onEdit(truck: Truck) {
    this.truckService.selectedTruck = Object.assign({}, truck);
  }
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.truckService.deleteTruck(key);
    }
  }

}
