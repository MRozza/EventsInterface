import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {EventDisplay} from "../../../models/eventDisplay";
import {CreateEventStep1Model} from "../../../models/eventscreationworkflow/createEventStep1Model";
import {EventTemplate} from "../../../models/eventTemplate";
import {Location} from "../../../models/location";
import {EventType} from "../../../models/eventType";
import {EventCategory} from "../../../models/eventcategory";
import {EventSettings} from "../../../models/eventSettings";
import {TicketPurchase, TicketPurchaseDataViewModel} from "../../../models/ticketPurchase";
import {TicketCreation} from "../../../models/ticketCreation";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
import {Question} from "../../../models/Survey";

declare const toastr: any;

declare let jQuery: any;
declare let moment: any;

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html'
})
export class UpdateEventComponent implements OnInit {

  public ed: EventDisplay = <EventDisplay>{};
  public id: string = '';
  public opacity: number = 1;
  public ticketCreation: TicketCreation = <TicketCreation>{};
  @Output() idChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private title: Title, private translateService: TranslateService,private route: ActivatedRoute, private call: CallService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.idChanged.emit(this.id);
        this.init();
      }
    });
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('UpdateEvent'));

  }

  ngOnInit() {

  }

  private init(): void {
    this.ed.EventDetails = <CreateEventStep1Model>{};
    this.ed.EventDetails.Location = <Location>{};
    this.ed.EventDetails.Category = <EventCategory>{};
    this.ed.EventDetails.EventType = <EventType>{};
    this.ed.EventTemplate = <EventTemplate>{};
    this.ed.EventSettings = <EventSettings>{};
    this.ed.TicketPurchase = <TicketPurchase>{};
    this.ed.TicketPurchase.TicketPurchaseData = <Array<TicketPurchaseDataViewModel>>[];
    this.ed.Tickets = <Array<TicketCreation>>[];
    jQuery('.event-profile').css('margin-right', jQuery('.drawer').width() + 'px');

    if (this.id) {
      this.getEventAndTicketsData(this.id);
    }
  }

  getEventAndTicketsData(EventID: string) {
    jQuery.blockUI();
    this.call.get('/Events/GetEventDataForDisplay?EventID=' + EventID, null, 'json').subscribe((res: any) => {
      if(res===401)
        return this.router.navigateByUrl('/dashboard');
      moment.locale('ar');
      res.EventDate = moment(res.EventDetails.StartDate).format('LL') + ' - ' + moment(res.EventDetails.EndDate).format('LL');
      this.ed = res;
      if (this.ed.EventTemplate && this.ed.EventTemplate.CoverImageOpacity) {
        this.opacity = Number(this.ed.EventTemplate.CoverImageOpacity) / 10;
      }
      jQuery.unblockUI();
    });
  }

  publish() {
    this.call.post('/Events/Publish?eventID=' + this.id, null, 'json').subscribe((res: any) => {
      toastr.success('تم نشر الحدث بنجاح');
      this.router.navigate(['event/view', this.id]);
    });
  }
}
