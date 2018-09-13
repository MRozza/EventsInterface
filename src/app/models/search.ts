//import {ContactViewModel} from "./contact";

export class Search {
  constructor(public Locations?: string,
              public DateFrom?: string,
              public DateTo? : string,
              public EventTypes?: string,
              public EventTitle?: string,
              public CityName?: string,
              public  EventCategory?: string) {
  }
}
