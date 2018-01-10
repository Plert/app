import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, ContactField, ContactName, ContactFieldType} from '@ionic-native/contacts';
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

  phoneContactList = [];
  queryContact:string ="";
  selectedPhones = [];
  search = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage:Storage,
  private contacts: Contacts, private sanitizer: DomSanitizer) {
    this.id = this.navParams.data.id;
    this.name = this.navParams.data.name;
    this.latitude = this.navParams.data.latitude;
    this.longitude = this.navParams.data.longitude;
    this.selectedPhones = this.navParams.data.phones;
    this.message = this.navParams.data.message;

    this.storage.get("alerts").then((val)=>{
      if(val != null){
        // Set alerts array
        this.alerts = JSON.parse(val);
      }else{
        this.alerts = [];
      }
    });

    this.findContacts("");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAlertPage');
  }

  findContacts(query){
    //Get phone contacts
    this.phoneContactList = [];
    console.log("Getting phone contacts :"+query);
    let fields:ContactFieldType[] = ['displayName', 'phoneNumbers', 'photos','name'];
    this.contacts.find(fields,{filter: query, multiple: true, hasPhoneNumber: true}).then((contacts) => {
      console.log("Final Contacts");
      for (var i=0 ; i < contacts.length; i++){
        console.log(contacts[i]);
        if(contacts[i].name !== null) {
          var contact = {};
          contact["name"]   = contacts[i].name.formatted;
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
      console.log(this.phoneContactList);
      this.search = true;    
    },(err) => {
      this.phoneContactList = [];
      this.search = false; 
     });
  }

  getContacts(event){
    console.log(event);
    console.log(this.queryContact);
    this.findContacts(this.queryContact);
  }

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

  editAlert(){
    for(let alert of this.alerts){
      if(alert.id == this.id){
        alert.name = this.name;
        alert.latitude = this.latitude;
        alert.longitude = this.longitude;
        alert.message = this.message;
        alert.phones = this.selectedPhones;
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
