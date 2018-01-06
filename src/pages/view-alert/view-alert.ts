import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-view-alert',
  templateUrl: 'view-alert.html',
})
export class ViewAlertPage {
  alerts:any;
  id:string;
  name:string;
  latitude: number;
  longitude: number;
  phone1: string;
  phone2: string;
  phone3: string;
  message:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage:Storage) {
    this.id = this.navParams.data.id;
    this.name = this.navParams.data.name;
    this.latitude = this.navParams.data.latitude;
    this.longitude = this.navParams.data.longitude;
    this.phone1 = this.navParams.data.phone1;
    this.phone2 = this.navParams.data.phone2;
    this.phone3 = this.navParams.data.phone3;
    this.message = this.navParams.data.message;

    this.storage.get("alerts").then((val)=>{
      if(val != null){
        // Set alerts array
        this.alerts = JSON.parse(val);
      }else{
        this.alerts = [];
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAlertPage');
  }

  editAlert(){
    for(let alert of this.alerts){
      if(alert.id == this.id){
        alert.name = this.name;
        alert.latitude = this.latitude;
        alert.longitude = this.longitude;
        alert.phone1 = this.phone1;
        alert.phone2 = this.phone2;
        alert.phone3 = this.phone3;
        alert.message = this.message;
      }
    }

    console.log("Elements edited");
    console.log(this.alerts);
    // Replace local storage with new list
    this.storage.set("alerts",JSON.stringify(this.alerts));

    this.navCtrl.pop();
    window.location.reload();
  }

}
