import {Component, Input, OnInit} from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-event-sponsors',
  templateUrl: './event-sponsors.component.html'
})
export class EventSponsorsComponent implements OnInit {

  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
    jQuery('.event-sponsors').hide();
  }

  public hide(): void {
    jQuery('.event-sponsors').fadeOut();
  }

}
