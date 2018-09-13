import { Component, OnInit } from '@angular/core';
import {EventItems} from "../../../interfaces/event-items";
import {CallService} from "../../../services/call.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
declare let moment: any;

@Component({
  selector: 'app-my-events-past',
  templateUrl: './my-events-past.component.html'
})
export class MyEventsPastComponent implements OnInit {
  data: Array<EventItems> = <Array<EventItems>> [];

  constructor(private call: CallService,private title: Title,private translateService:TranslateService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('MyEventsPast'));

  }

  ngOnInit() {
    this.call.get('/users/GetUserEventList?isUpcoming=false&isDraft=false')
      .subscribe((res: Array<EventItems>) => {
        res.forEach((e: any) => {
          e.date = moment(e.startDate).format('LL') + ' - ' + moment(e.endDate).format('LL');
        });
        this.data = res;
      });
  }
}
