import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location'
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the NewAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-alert',
  templateUrl: 'new-alert.html',
})
export class NewAlertPage {
  name:string;
  latitude: number;
  longitude: number;
  phone1: string;
  phone2: string;
  phone3: string;
  message:string;

  alerts:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationProvider: LocationProvider,
    private storage: Storage) {

      this.storage.get("alerts").then((val)=>{
        if(val != null){
          // Set alerts array
          this.alerts = JSON.parse(val);
        }else{
          this.alerts = [];
        }
      });
  }

  ionViewWillEnter() {
    console.log('Loading Current Location');
    this.locationProvider.getLocation()
    .subscribe(location =>{
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      console.log(location);
    });
  }

  saveAlert(){
    console.log("saving");  
    let newAlert = {
      id:Math.random().toString(36).substr(2, 9),
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      phone1: this.phone1,
      phone2: this.phone2,
      phone3: this.phone3,
      message: this.message,
      status: true
    }
    this.alerts.push(newAlert);
    console.log(newAlert);
    // Set to storage
    this.storage.set("alerts",JSON.stringify(this.alerts));

    // GO HOME
    this.navCtrl.pop();
    window.location.reload();
    
  }


}
