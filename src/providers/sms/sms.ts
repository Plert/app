import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';

import { HttpClient , HttpClientModule } from '@angular/common/http';
import { NavController, ToastController} from 'ionic-angular';
@Injectable()
export class SmsProvider {

  constructor(public http: HttpClient,private toast:ToastController) {
    console.log('Hello SmsProvider Provider');
  }

  // sendSMS(phones,message){
  //   console.log(phones);
  //   console.log(message);
  //   let validPhones:Array<string> = [];
  //   for(let phone of phones){
  //     console.log("Sending to "+phone);
  //     console.log(message);
      
  //     if(phone != undefined){
  //       validPhones.push(phone);
  //       //this.sms.send(phone,message);
  //     }
  //     console.log(validPhones);
   
    
  //   }
  // }

  sendByAPI(phones,message){
    let url = "/smsApi/";
    let key = "GqiacjegdD0c1Va9tXesR8EEO0ZrHK7FD8luC7mSh0";

    let body =  {
      "destinations":phones,
      "template":{
        "source": "Plert",
        "text": message,
        "encoding": "AUTO"
        },
       "includeMessagesInResponse": true
    };

    console.log('Sending to api');
    console.log(body);
    this.http.post(url,body,{
      headers: { 'Authorization': 'Bearer '+key,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type':'application/json'
    }
    }).subscribe(
        res => {
          console.log("SMS sent")
          console.log(res);
          const toast = this.toast.create({
            message: "SMS sent",
            duration: 3000
          });
          toast.present();
        },
        err => {
          console.log("Error occured");
          console.log(err);
          const toast = this.toast.create({
            message: "SMS not sent",
            duration: 3000
          });
          toast.present();
        }
      );
  }

}
