import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventDisplay} from "../../../models/eventDisplay";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare let jQuery: any;
declare let moment: any;

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html'
})
export class ViewEventComponent implements OnInit {
  public ed: EventDisplay = null;
  public opacity: number = 1;
  public id: string = '';
  // @ViewChild('img') img: ElementRef;

  constructor(private title: Title, private translateService: TranslateService,private route: ActivatedRoute, private call: CallService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getEventAndTicketsData();
      }
    });
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('ViewEvent'));

  }

  ngOnInit() {
  }


  private getEventAndTicketsData() {
    jQuery.blockUI();
    this.call.get('/Events/GetEventDataForDisplay?EventID=' + this.id, null, 'json').subscribe((res: any) => {
      moment.locale('ar');
      res.EventDate = moment(res.EventDetails.StartDate).format('LL') + ' - ' + moment(res.EventDetails.EndDate).format('LL');
      this.ed = res;
      if (this.ed.EventTemplate && this.ed.EventTemplate.CoverImageOpacity) {
        this.opacity = Number(this.ed.EventTemplate.CoverImageOpacity) / 10;
      }
      this.call.get('/Events/AddVisit?eventID=' + this.id, null, 'json').subscribe((res: any) => {

      });
      jQuery.unblockUI();
    });
  }

}
