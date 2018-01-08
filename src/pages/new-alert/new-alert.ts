import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location'
import { Storage } from '@ionic/storage';

import { DomSanitizer } from '@angular/platform-browser';
import { Contact, ContactField, ContactName, Contacts } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-new-alert',
  templateUrl: 'new-alert.html',
})
export class NewAlertPage {
  notificationType: string = "phone";
  name:string;
  latitude: number;
  longitude: number;
  phone1: string;
  phone2: string;
  phone3: string;
  message:string;

  alerts:any;
  phoneContactList = [];
  search = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationProvider: LocationProvider,
    private storage: Storage,
    private contacts: Contacts, private sanitizer: DomSanitizer) {

      this.storage.get("alerts").then((val)=>{
        if(val != null){
          // Set alerts array
          this.alerts = JSON.parse(val);
        }else{
          this.alerts = [];
        }
      });

      //Get phone contacts
      console.log("Getting phone contacts");
      this.contacts.find(['displayName', 'phoneNumbers', 'photos'], {multiple: true, hasPhoneNumber: true}).then((contacts) => {
        if(contacts.length == 0){
          this.phoneContactList.push({"name": 'No Contacts found'}); 
          this.search = false;    
        }
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            var contact = {};
            contact["name"]   = contacts[i].displayName;
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if(contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact["image"] = "assets/dummy-profile-pic.png";
            }
            this.phoneContactList.push(contact);
          }
        }
        this.search = true;    
      });;
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
      distance: 0,
      isWaiting:false,
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
