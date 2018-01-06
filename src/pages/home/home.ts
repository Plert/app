import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewAlertPage } from '../new-alert/new-alert'
import { Storage } from '@ionic/storage';

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
}
