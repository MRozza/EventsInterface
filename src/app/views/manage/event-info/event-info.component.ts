import {Component, Input, OnInit} from '@angular/core';
import {CreateEventStep1Model} from "../../../models/eventscreationworkflow/createEventStep1Model";

declare let jQuery: any;

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent implements OnInit {
  @Input() model: CreateEventStep1Model=<CreateEventStep1Model>{};

  ngOnInit() {
    jQuery('.event-info').hide();
  }

  public hide(): void {
    jQuery('.event-info').fadeOut();
  }


}
