import {Location} from "./location";
import {EventType} from "./eventType";

export class EventDetail {
  constructor(public Id : Number,
              public Title?: string,
              public StartDate?: string,
              public EndDate? : string,
              public StartTime? : string,
              public EndTime?: string,
              public Description?: string,
              public Location?: Location,
              public ShowMapOnEvent?: string,
              public EventType?: EventType) {
  }
}
