import {Component, Input, OnInit} from '@angular/core';
import {TicketAttendeeInfo, TicketPurchase, TicketPurchaseDataViewModel} from "../../../models/ticketPurchase";

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html'
})
export class TicketInfoComponent implements OnInit {
  @Input() public ticketAttendeeInfo: TicketAttendeeInfo = <TicketAttendeeInfo>{};
  @Input() public ticketPurchaseData: Array<TicketPurchaseDataViewModel> = <Array<TicketPurchaseDataViewModel>>[];
  public subTotal:number =0;
  public VAT:number =0;
  constructor() { }

  ngOnInit() {
    this.ticketPurchaseData.forEach(ticket=>{
      if(ticket.Quantity>0)
      {
        this.subTotal+=Number(ticket.Price)*ticket.Quantity;
      }
    });
    this.VAT=(this.subTotal*5) /100;
  }
}
