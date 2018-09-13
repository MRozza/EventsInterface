import {Component, Input, OnInit} from '@angular/core';
import {TicketPurchaseDataViewModel} from "../../../models/ticketPurchase";

@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.component.html'
})
export class SelectTicketsComponent implements OnInit {
@Input() tickets: Array<TicketPurchaseDataViewModel>=<Array<TicketPurchaseDataViewModel>>[];
  constructor() { }

  ngOnInit() {
  }

}
