import { Injectable } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Injectable()
export class ContactsProvider {
  public phoneContacts:Contact[]=[];

  constructor(private contacts: Contacts) { }

  getPhoneContacts(){
    return this.contacts.find(['displayName', 'name', 'phoneNumbers'], {filter: "", multiple: true});
  }

}
