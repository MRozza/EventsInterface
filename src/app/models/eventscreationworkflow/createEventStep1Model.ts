import {Location} from "../location";
import {EventType} from "../eventType";
import {EventCategory} from "../eventcategory";

export class CreateEventStep1Model {
  constructor(public Id : string,
              public EventTitle?: string,
              public Category?: EventCategory,
              public EventCapacity? : Number,
              public StartDate? : string,
              public EndDate?: string,
              public StartTime?: string,
              public EndTime?: string,
              public Description?: string,
              public Location?: Location,
              public EventType?: EventType) {
  }
}
