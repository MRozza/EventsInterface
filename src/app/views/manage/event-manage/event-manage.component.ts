import { Component, OnInit } from '@angular/core';
declare let jQuery: any;

@Component({
  selector: 'app-event-manage',
  templateUrl: './event-manage.component.html'
})
export class EventManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('.event-manage').hide();
  }

  public hide(): void {
    jQuery('.event-manage').fadeOut();
  }

}
