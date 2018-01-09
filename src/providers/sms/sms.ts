import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';

@Injectable()
export class SmsProvider {

  constructor(private sms:SMS) {
    console.log('Hello SmsProvider Provider');
  }

  sendSMS(phones,message){
    console.log(phones);
    console.log(message);
    let validPhones:Array<string> = [];
    for(let phone of phones){
      console.log("Sending to "+phone);
      console.log(message);
      
      if(phone != undefined){
        validPhones.push(phone);
        //this.sms.send(phone,message);
      }
      console.log(validPhones);
   
    
    }
  }

}
