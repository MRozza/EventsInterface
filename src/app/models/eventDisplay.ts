import {EventTemplate} from "./eventTemplate";
import {CreateEventStep1Model} from "./eventscreationworkflow/createEventStep1Model";
import {EventSettings} from "./eventSettings";
import {TicketPurchase} from "./ticketPurchase";
import {TicketCreation} from "./ticketCreation";

export class EventDisplay {
  constructor(public EventTemplate: EventTemplate,
              public EventDetails: CreateEventStep1Model,
              public EventDate: string,
              public EventSettings:EventSettings,
              public TicketPurchase:TicketPurchase,
              public Tickets: Array<TicketCreation>,
              public IsPublished: boolean) {
  }
}
