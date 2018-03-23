import { NgModule, ErrorHandler } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
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
import { LaunchNavigator } from '@ionic-native/launch-navigator';
//People
import { ProfilePage } from '../pages/profile/profile';
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

// FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Authentication
import { GooglePlus } from '@ionic-native/google-plus'; // We'll install this in the next section

const firebaseConfig = {
  // your config
}
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage,
    PeoplePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewAlertPage,
    ViewAlertPage,
    PeoplePage,
    ProfilePage
  ],
  providers: [
    HTTP,
    HttpClient,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    LaunchNavigator,
    BackgroundGeolocation,
    Geolocation,
    SMS,
    SmsProvider,
    SocialSharing,
    Contacts,
    ContactsProvider,
    FbAuthProvider,
    GooglePlus,
  ]
})
export class AppModule {}
