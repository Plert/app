import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';

@Injectable()
export class SmsProvider {

  constructor(private sms:SMS) {
    console.log('Hello SmsProvider Provider');
  }

  sendSMS(phones,message){
    console.log(message);
    for(let phone of phones){
      this.sms.send(phone,message);
    }
  }

}
