import {Component, Input, OnInit} from '@angular/core';
import { TicketsInfo} from "../../../models/ticketPurchase";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html'
})
export class PersonInfoComponent implements OnInit {
  @Input() public ticketInfo :TicketsInfo;
  constructor() { }

  ngOnInit() {
  }


}
