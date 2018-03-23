import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationProvider } from '../../providers/location/location'

declare var google;
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
  currentlat:number;
  currentlng:number;

  search = false;
  // Map Variables
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  plertDistance:number = 50;
  addressElement: HTMLInputElement = null;
  map:any;
  autocomplete:any
  markers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage:Storage, private sanitizer: DomSanitizer,
  private locationProvider: LocationProvider) {
    this.id = this.navParams.data.id;
    this.name = this.navParams.data.name;
    this.latitude = this.navParams.data.latitude;
    this.longitude = this.navParams.data.longitude;
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
      this.currentlat = location.coords.latitude;
      this.currentlng = location.coords.longitude;
      //Load Map with current location
      this.loadMap(this.latitude,this.longitude);

    });
  }
   editAlert(){
    for(let alert of this.alerts){
      if(alert.id == this.id){
        alert.name = this.name;
        alert.latitude = this.latitude;
        alert.longitude = this.longitude;
      }
    }

    console.log("Elements edited");
    console.log(this.alerts);
    // Replace local storage with new list
    this.storage.set("alerts",JSON.stringify(this.alerts));

    this.navCtrl.pop();
    window.location.reload();
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
}
