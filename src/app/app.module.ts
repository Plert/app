import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { NewAlertPage } from '../pages/new-alert/new-alert';
import { PeoplePage } from '../pages/people/people';
import { ViewAlertPage } from '../pages/view-alert/view-alert';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
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
import { FbAuthProvider } from '../providers/fb-auth/fb-auth';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage,
    PeoplePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage,
    PeoplePage
  ],
  providers: [
    HTTP,
    HttpClient,
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
    ContactsProvider,
    FbAuthProvider
  ]
})
export class AppModule {}
