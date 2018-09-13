import {Component, Input, OnInit} from '@angular/core';
import {TicketCreation} from "../../../models/ticketCreation";
declare let jQuery: any;

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html'
})
export class SalesSummaryComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    jQuery('.event-manage').hide();
  }

  public hide(): void {
    jQuery('.event-manage').fadeOut();
  }
}
