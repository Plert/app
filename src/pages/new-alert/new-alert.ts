import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location'
import { Storage } from '@ionic/storage';

import { DomSanitizer } from '@angular/platform-browser';
//import { Contacts, ContactField, ContactName, ContactFieldType} from '@ionic-native/contacts';

declare var google;
@IonicPage()
@Component({
  selector: 'page-new-alert',
  templateUrl: 'new-alert.html',
})
export class NewAlertPage {
  notificationType: string = "phone";
  name:string;
  // Map Variables
  @ViewChild('map') mapElement: ElementRef;
  map:any;
  latitude: number;
  longitude: number;
  
  message:string;

  alerts:any;
  phoneContactList = [];
  queryContact:string ="";
  selectedPhones = [];
  search = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationProvider: LocationProvider,
    private storage: Storage, private sanitizer: DomSanitizer) {

      this.storage.get("alerts").then((val)=>{
        if(val != null){
          // Set alerts array
          this.alerts = JSON.parse(val);
        }else{
          this.alerts = [];
        }
      });  

      this.phoneContactList = [];
      this.search = false;  
  }

  ionViewWillEnter() {
    console.log('Loading Current Location');
    this.locationProvider.getLocation()
    .subscribe(location =>{
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      console.log(location);
      //Load Map with current location
      this.loadMap(this.latitude,this.longitude);
    });
  }

  loadMap(lat,long){
    console.log('Loading Google maps('+lat+","+long+")")
    let latLng = new google.maps.LatLng(lat,long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);
  }

  // findContacts(query){
  //   //Get phone contacts
  //   this.phoneContactList = [];
  //   console.log("Getting phone contacts :"+query);
  //   let fields:ContactFieldType[] = ['displayName', 'phoneNumbers', 'photos','name'];
  //   this.contacts.find(fields,{filter: query, multiple: true, hasPhoneNumber: true}).then((contacts) => {
  //     console.log("Final Contacts");
  //     for (var i=0 ; i < contacts.length; i++){
  //       console.log(contacts[i]);
  //       if(contacts[i].name !== null) {
  //         var contact = {};
  //         contact["name"]   = contacts[i].name.formatted;
  //         contact["number"] = contacts[i].phoneNumbers[0].value;
  //         if(contacts[i].photos != null) {
  //           console.log(contacts[i].photos);
  //           contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
  //           console.log(contact);
  //         } else {
  //           contact["image"] = "assets/dummy-profile-pic.png";
  //         }
  //         this.phoneContactList.push(contact);
  //       }
  //     }
  //     console.log(this.phoneContactList);
  //     this.search = true;    
  //   },(err) => {
  //     this.phoneContactList = [];
  //     this.search = false; 
  //    });
  // }

  // getContacts(event){
  //   console.log(event);
  //   console.log(this.queryContact);
  //   this.findContacts(this.queryContact);
  // }

  onChangeContact(phone,isChecked){
    if(isChecked){
      //Add phone to list
      this.selectedPhones.push(String(phone));
    }else{
      //remove from list
      let index = this.selectedPhones.indexOf(String(phone));
      if(index > -1){
        this.selectedPhones.splice(index,1);
      }
    }
    console.log("Total Phones");
    console.log(this.selectedPhones);
  }

  saveAlert(){
    console.log("saving");  
    let newAlert = {
      id:Math.random().toString(36).substr(2, 9),
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      phones:this.selectedPhones,
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
