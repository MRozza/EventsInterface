import {Component, Input, OnInit} from '@angular/core';
import {EventTemplate} from "../../../models/eventTemplate";
declare let jQuery: any;

@Component({
  selector: 'app-event-design',
  templateUrl: './event-design.component.html'
})
export class EventDesignComponent implements OnInit {
  @Input() public eventTemplate: EventTemplate = <EventTemplate>{};
  constructor() { }

  ngOnInit() {
    jQuery('.design-event').hide();
  }

  public hide(): void {
    jQuery('.design-event').fadeOut();
  }

}
