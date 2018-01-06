import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewAlertPage } from '../new-alert/new-alert'
import { Storage } from '@ionic/storage';
import { ViewAlertPage } from '../view-alert/view-alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  onClickNewAlert: any;
  alerts:any;
  constructor(public navCtrl: NavController,
  private storage: Storage) {
    this.onClickNewAlert = NewAlertPage;

    this.storage.get("alerts").then((val)=>{
      if(val != null){
        // Set alerts array
        this.alerts = JSON.parse(val);
      }else{
        this.alerts = [];
      }

      console.log("Total Alerts")
      console.log(this.alerts)
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

}
