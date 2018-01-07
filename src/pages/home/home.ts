import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewAlertPage } from '../new-alert/new-alert'
import { Storage } from '@ionic/storage';
import { ViewAlertPage } from '../view-alert/view-alert';
import { SmsProvider } from '../../providers/sms/sms';
import { LocationProvider } from '../../providers/location/location'
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  onClickNewAlert: any;
  alerts:any;

  constructor(public navCtrl: NavController,
  private storage: Storage,
  private sms:SmsProvider,
  public locationTracker:LocationProvider,
  public events: Events) {

    this.onClickNewAlert = NewAlertPage;

    this.storage.get("alerts").then((val)=>{
      if(val != null){
        // Set alerts array
        this.alerts = JSON.parse(val);
        // Start tracking location
        this.start();
      }else{
        this.alerts = [];
      }

      console.log("Total Alerts")
      console.log(this.alerts)
    });

    events.subscribe('location:updated', (location, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.updateDistance();
    });

  }
  

  updateAlerts(){
    // Set to storage
    this.storage.set("alerts",JSON.stringify(this.alerts));
  }

  remove(alert){
    // Search in this alerts for id and remove from list
    let index = this.alerts.indexOf(alert);
    this.alerts.splice(index,1);
    this.storage.set("alerts",JSON.stringify(this.alerts));
  }

  onClick(alert){
    // GO to VIEW ALERT
    this.navCtrl.push(ViewAlertPage,alert);
  }

  sendAlert(alert){
    // Send message
    //let newMessage = alert.message + "(This is an automatic alert - Visit www.plert.com)"
    this.sms.sendSMS([alert.phone1,alert.phone2,alert.phone3],alert.message);
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

  updateDistance(){
    for(let alert of this.alerts){
      alert.distance = this.calculateDistance(
        [alert.latitude,alert.longitude],
        [this.locationTracker.lat,this.locationTracker.lng]);

      if(alert.status && alert.distance < 50 && alert.isWaiting){
        // send notification
        this.sendAlert(alert);
      }
      
      if(alert.distance > 50){
        alert.isWaiting = true;
      }else{
        alert.isWaiting = false;
      }
    }
  }

  calculateDistance(loc1,loc2){
    let radlat1 = Math.PI * loc1[0]/180
    var radlat2 = Math.PI * loc2[0]/180
    var theta = loc1[1]-loc2[1]
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344 // Change to kilometres
    dist = dist * 1000 // Chenge to meters
    return Math.round(dist);
  }

}
