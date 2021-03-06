import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {
  addBy:any;
  onClickProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.onClickProfile = ProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
