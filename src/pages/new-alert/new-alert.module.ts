import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAlertPage } from './new-alert';

@NgModule({
  declarations: [
    NewAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAlertPage),
  ],
})
export class NewAlertPageModule {}
