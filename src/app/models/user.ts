import {Contact} from "./contact";

export class User {
  constructor(public Id: string,
              public Email: string,
              public Mobile : string,
              public FirstName: string,
              public LastName:string,
              public Password: string,
              public Contact: Contact,
              public IsActivated:boolean=false) {
  }
}
