import {Answer, Question} from "./Survey";

export interface TicketPurchaseDataViewModel {
  TicketId: string;
  IsAvailable: boolean;
  TicketTitle: string;
  Price: string;
  Description: string;
  Quantity: number;
  Answers : Array<Answer>;
  Questions : Array<Question>;
}

export interface TicketPurchase {
  EventId: string;
  EventTitle: string;
  EventLocation: string;
  EventDate: string;
  Latitude: string;
  Longitude: string;
  TicketPurchaseData: Array<TicketPurchaseDataViewModel>;
}

export interface TicketAttendeeName{
  TicketId:string;
  FirstName: string;
  LastName: string;
  Answers : Array<Answer>;
  Questions : Array<Question>;
}
export interface TicketAttendeeInfo {
  Email:string;
  Mobile: string;
  TicketAttendeeName:Array<TicketAttendeeName>;
}

export interface TicketsInfo {
  TicketId:string;
  TicketTitle: string;
  TicketsInfoName:TicketsInfoName;
  Index:number;
  Number:number;
  Questions : Array<Question>;
}

export interface TicketsInfoName {
  FirstName: string;
  LastName: string;
  Answers : Array<Answer>;
  Questions : Array<Question>;
}
