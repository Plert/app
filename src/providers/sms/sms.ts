import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';

import { HttpClient , HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { NavController, ToastController} from 'ionic-angular';
@Injectable()
export class SmsProvider {

  constructor(public http: HTTP,private toast:ToastController) {
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
    let url = "https://api.wavecell.com/sms/v1/placealert_3dDFE_hq/many/compact";
    let key = "GqiacjegdD0c1Va9tXesR8EEO0ZrHK7FD8luC7mSh0";

    let body =  {
      destinations:phones,
      template:{
        source: 'Plert',
        text: message,
        encoding: 'AUTO'
      }
    };

    console.log('Sending to api');
    console.log(body);
    let ket = 'Bearer '+key;
    this.http.setDataSerializer('json');
    this.http.post(url,body,{ Authorization: String(ket) , 'Content-Type': 'application/json'}
    ).then(
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
          console.log(err.error);
          const toast = this.toast.create({
            message: "SMS not sent",
            duration: 3000
          });
          toast.present();
        }
      );
  }

}
