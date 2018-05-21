import { Component ,ViewChild,ElementRef, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lat:any;
  lng:any;

   @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone
  ) { 
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  public locateMe()
    { 
      console.log("check for gps");
      if (navigator)
      {
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
        });
      }
      console.log("check for gps ends");
    
  }

  ngOnInit() {

    this.mapsAPILoader.load().then(
      () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
      
      autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      if(place.geometry === undefined || place.geometry === null ){
      return;
      }
      });
      });
      }
      );
      
  }
 

}
