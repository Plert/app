import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation'
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/filter';

@Injectable()

export class LocationProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, 
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    public events: Events) {
    console.log("LocationProvider loaded");
  }


  getLocation() {
    // return this.geolocation.getCurrentPosition().then((resp) => {
    //  console.log(resp.coords.latitude)
    //  console.log(resp.coords.longitude)
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    return this.geolocation.watchPosition();
  }

  startTracking() {
    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.events.publish('location:updated', [this.lat,this.lng], Date.now());
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.events.publish('location:updated', [this.lat,this.lng], Date.now());
      });

    });
  }

  stopTracking() {
    console.log('stopTracking');
  
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
