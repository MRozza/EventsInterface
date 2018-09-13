import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tickets-top-tab',
  templateUrl: './tickets-top-tab.component.html'
})
export class TicketsTopTabComponent implements OnInit {
  @Input("activeTab") activeTab: number;

  constructor() { }

  ngOnInit() {
  }

}
