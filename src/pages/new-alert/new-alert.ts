import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { Searchbar } from 'ionic-angular/components/searchbar/searchbar';
import { LoadingController } from 'ionic-angular';
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
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  plertDistance:number = 50;
  addressElement: HTMLInputElement = null;
  map:any;
  autocomplete:any;
  address:any;
  public latitude: number;
  public longitude: number;
  currentlat:number;
  currentlng:number;
  markers = [];
  mapCircle = [];

  // Set Time variables
  public isDateTime: boolean = false;
  public event = {
    date: '1990-02-19',
    time: '07:43'
  }
  
  message:string;

  alerts:any;
  phoneContactList = [];
  queryContact:string ="";
  selectedPhones = [];
  search = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationProvider: LocationProvider,
    private storage: Storage, private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController) {
      //Set current date to date component
      let today = new Date();
      this.event.date = today.toISOString().substring(0, 10);
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
      this.currentlat = location.coords.latitude;
      this.currentlng = location.coords.longitude;
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
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
    // Init on Long hold event
    google.maps.event.addListener(this.map, 'idle', () => {
      let location = this.map.getCenter();
      this.addMarker(this.map.getCenter(), "Mein gesuchter Standort");
    

      //Update location
      this.updateLocation(location.lat(),location.lng());
    });
    this.initAutocomplete();
  }

  updateLocation(lat,lng){
    console.log("=======================");
    console.log("Updating Location");
    console.log(lat);
    console.log(lng);
    this.latitude = lat;
    this.longitude = lng;
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 15
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");

      //Update location
      this.updateLocation(location.lat(),location.lng());
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  addMarker(position, content) {
    this.clearAllMarkers();
    let marker = new google.maps.Marker({
      map: this.map,
      position: position,
      label: "P",
      zoom: 15
    });

    // Add circle overlay and bind to marker
    console.log("Plert Distance: "+this.plertDistance);
    var circle = new google.maps.Circle({
      map: this.map,
      radius: +this.plertDistance,    // in meters
      fillColor: '#F77600',
      strokeColor: '#F77600',
      strokeOpacity: 0.1,
      strokeWeight: 2,
    });
    circle.bindTo('center', marker, 'position');

    this.markers.push(marker);
    this.markers.push(circle);
    this.addInfoWindow(marker, content);
    return marker;
  }

  clearAllMarkers(){
    for (var i=0;i < this.markers.length;i++){
      this.markers[i].setMap(null);
    }
  }
  
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  // SET DATE TIME FUNCTIONS
  onToggleDateTime(){
    this.isDateTime = !this.isDateTime;
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
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Please wait...',
      duration:3000
    });
    loading.present();
    
    var distance = this.calculateDistance([this.latitude,this.longitude],[this.currentlat,this.currentlng]); 
    console.log("Distance from point: "+distance+"meter");
    console.log("Plert distance: "+this.plertDistance);
    let newAlert = {};
    if(distance - 500 < 0){
      console.log("Inside Radius");
      // Activate Plert alert
      // waiting to go outside of radius to change status of isWaiting
      newAlert = {
        id:Math.random().toString(36).substr(2, 9),
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        isDateTime: this.isDateTime,
        plertDistance: +this.plertDistance,
        dateTime: this.event,
        distance: 0,
        isWaiting:false,
        status: true
      }
    }else{
      console.log("Outside Radius");
      //Activate Plert alert
      newAlert = {
        id:Math.random().toString(36).substr(2, 9),
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        isDateTime: this.isDateTime,
        plertDistance: +this.plertDistance,
        dateTime: this.event,
        distance: distance,
        isWaiting:true,
        status: true
      }
    }
    
    this.alerts.push(newAlert);
    console.log(newAlert);
    // Set to storage
    this.storage.set("alerts",JSON.stringify(this.alerts));

    // GO HOME
    this.navCtrl.pop();
    window.location.reload();
    
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
