import { Component, OnInit } from '@angular/core';
import {EventItems} from "../../../interfaces/event-items";
import {CallService} from "../../../services/call.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
declare let moment: any;
@Component({
  selector: 'app-my-events-going',
  templateUrl: './my-events-going.component.html'
})
export class MyEventsGoingComponent implements OnInit {
  data: Array<EventItems> = <Array<EventItems>> [];

  constructor(private title: Title,private translateService:TranslateService,private call: CallService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('MyEventsGoing'));

  }

  ngOnInit() {
    this.call.get('/users/GetUserEventList?isUpcoming=true&isDraft=false')
      .subscribe((res: Array<EventItems>) => {
        res.forEach((e: any) => {
          e.date = moment(e.startDate).format('LL') + ' - ' + moment(e.endDate).format('LL');
        });
        this.data = res;
      });
  }

}
