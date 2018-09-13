import {Component, Input, OnInit} from '@angular/core';
import {EventSettings} from "../../../models/eventSettings";
declare let jQuery: any;

@Component({
  selector: 'app-event-settings',
  templateUrl: './event-settings.component.html'
})
export class EventSettingsComponent implements OnInit {
  @Input() public eventSettings: EventSettings = <EventSettings>{};
  constructor() { }

  ngOnInit() {
    jQuery('.event-settings').hide();
  }

  public hide(): void {
    jQuery('.event-settings').fadeOut();
  }

}
