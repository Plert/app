import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
/*
  Generated class for the SmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsProvider {

  constructor(private sms:SMS) {
    console.log('Hello SmsProvider Provider');
  }

  sendSMS(phones,message){
    for(let number of phones){
      console.log("Sending message to "+number);
      this.sms.send(number,message);
    }
  }

}
