import {EventDetail} from "./eventdetail";
import {EventCategory} from "./eventcategory";

export class Event {
  constructor(public Id : string,
              public EventDetail?: EventDetail,
              public EventCategory?:EventCategory,
              public OrganizerTitle?: string,
              public EventCapacity? : string,
              public OrganizerDescription? : string,
              public OrganizerTwitter?: string,
              public OrganizerInstagram?: string,
              public OrganizerEmail?: string) {
  }
}
