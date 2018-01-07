import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class LocationProvider {
  
  constructor(private backgroundGeolocation: BackgroundGeolocation,
     private geolocation: Geolocation) {
      
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log("Background current location");
        console.log(location);

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY

      });

      // start recording location
      this.backgroundGeolocation.start();

     }
  
     
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
