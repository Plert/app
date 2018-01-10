import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { NewAlertPage } from '../pages/new-alert/new-alert';
import { ViewAlertPage } from '../pages/view-alert/view-alert';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Location
import { LocationProvider } from '../providers/location/location';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

//SMS
import { IonicStorageModule } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { SmsProvider } from '../providers/sms/sms';
import { SocialSharing } from '@ionic-native/social-sharing';

//Conctacts
import { Contacts } from '@ionic-native/contacts';
import { ContactsProvider } from '../providers/contacts/contacts';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    BackgroundGeolocation,
    Geolocation,
    SMS,
    SmsProvider,
    SocialSharing,
    Contacts,
    ContactsProvider
  ]
})
export class AppModule {}
