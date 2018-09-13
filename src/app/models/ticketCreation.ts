import {Question} from "./Survey";

export class TicketCreation {
  constructor(public EventId: string,
              public Name: string,
              public Quantity: number,
              public Price: number,
              public IsFree: boolean,
              public MinimumByOrder: number,
              public MaxByOrder: number,
              public AvailableFromDate: string,
              public AvailableToDate: string,
              public AvailableFromTime: string,
              public AvailableToTime: string,
              public Description: string,
              public EventEndDate:Date,
              public Questions:Array<Question>,
              public ticketId:string) {
  }
}
