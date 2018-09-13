import { Component, OnInit } from '@angular/core';
import {TicketItem} from "../../../interfaces/ticket-item";
import {CallService} from "../../../services/call.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
declare let moment: any;
declare const jQuery: any;

@Component({
  selector: 'app-tickets-past',
  templateUrl: './tickets-past.component.html'
})
export class TicketsPastComponent implements OnInit {

  data: Array<TicketItem> = <Array<TicketItem>> [];

  constructor(private call: CallService,private title: Title,private translateService:TranslateService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('TicketsPast'));
  }

  ngOnInit() {
    jQuery.blockUI();
    this.call.get('/users/GetUserTickets?isUpcoming=false')
      .subscribe((res: any[]) => {

        moment.locale('ar');
        res.forEach((e: any) => {
          e.date = moment(e.startDate).format('LL') + ' - ' + moment(e.endDate).format('LL');
        });
        jQuery.unblockUI();
        this.data = res as Array<TicketItem>;
      });
  }

}
