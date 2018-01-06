import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(private geolocation: Geolocation) {}

  getLocation(){
    // return this.geolocation.getCurrentPosition().then((resp) => {
    //  console.log(resp.coords.latitude)
    //  console.log(resp.coords.longitude)
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    return this.geolocation.watchPosition();
  }
}
