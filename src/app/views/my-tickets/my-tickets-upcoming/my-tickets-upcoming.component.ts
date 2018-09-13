import {Component, OnInit} from '@angular/core';
import {CallService} from "../../../services/call.service";
import {TicketItem} from "../../../interfaces/ticket-item";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
declare let moment: any;
declare const jQuery: any;

@Component({
  selector: 'app-my-tickets-upcoming',
  templateUrl: './my-tickets-upcoming.component.html'
})
export class MyTicketsUpcomingComponent implements OnInit {
  data: Array<TicketItem> = <Array<TicketItem>> [];

  constructor(private call: CallService, private router: Router,private title: Title,private translateService:TranslateService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('MyTicketsUpcoming'));

  }

  ngOnInit() {
    jQuery.blockUI();
    this.call.get('/users/GetUserTickets?isUpcoming=true')
      .subscribe((res: any[]) => {

          moment.locale('ar');
          res.forEach((e: any) => {
            e.date = moment(e.startDate).format('LL') + ' - ' + moment(e.endDate).format('LL');
          });
          this.data = res as Array<TicketItem>;
        jQuery.unblockUI();
      });
  }

}
