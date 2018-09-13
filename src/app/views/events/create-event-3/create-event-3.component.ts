import {Component, OnInit} from '@angular/core';
import {TicketCreation} from "../../../models/ticketCreation";
import {ValidatorService} from "../../../services/validator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {SchemaGeneratorService} from "../../../services/schema-generator.service";
import {DatePipe} from "@angular/common";
import {DateOptions} from "../../../controls/pick-date/date-options";
import {Common} from "../../../classes/common";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
import {Question} from "../../../models/Survey";

declare const toastr: any;
declare let jQuery: any;

@Component({
  selector: 'app-create-event-3',
  templateUrl: './create-event-3.component.html'
})
export class CreateEvent3Component implements OnInit {
  public ticketCreation: TicketCreation = <TicketCreation>{MinimumByOrder: 1, MaxByOrder: 1};
  public unlimited: boolean = true;
  public errors: any[] = null;
  public dateOption1: DateOptions = <DateOptions>{};
  public dateOption2: DateOptions = <DateOptions>{};
  public defaultModal: any;
  public fromToday: boolean = false;
  public toEnd: boolean = false;


  constructor(private title: Title, private translateService: TranslateService, private call: CallService, private route: ActivatedRoute, private router: Router,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService,
              private datePipe: DatePipe) {
    this.defaultModal = Common.getQuillModel();
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('CreateEvent3'));

  }

  ngOnInit() {

    this.ticketCreation.EventId = this.route.snapshot.paramMap.get('id');
    this.ticketCreation.ticketId = this.route.snapshot.paramMap.get('ticketId');
    this.ticketCreation.Questions=<Array<Question>>[];
    if (this.ticketCreation.ticketId) {
      jQuery.blockUI();
      this.call.get('/Tickets/GetEventTicketById?ticketId=' + this.ticketCreation.ticketId, null, 'json').subscribe(
        (res: any) => {
          if (res === 401) {
            jQuery.unblockUI();
            return this.router.navigateByUrl('/dashboard');
          }
          this.ticketCreation = res;
          this.unlimited = this.ticketCreation.MaxByOrder === 0;
          jQuery.unblockUI();
        });
    }
    else {
      this.call.get('/Tickets/GetEventEndDate?eventId=' + this.ticketCreation.EventId, null, 'json').subscribe(
        (res: any) => {
          this.ticketCreation.EventEndDate = JSON.parse(res).result;
          jQuery.unblockUI();
        });
      this.unlimited = this.ticketCreation.MaxByOrder === 0;
      this.ticketCreation.AvailableFromTime = '08:00';
      this.ticketCreation.AvailableToTime = '17:00';
    }

  }

  submit(newTicket: boolean = false) {
    if (this.ticketCreation.AvailableFromDate && this.ticketCreation.AvailableToDate) {
      let startDate: number = Date.parse(this.ticketCreation.AvailableFromDate);
      let endDate: number = Date.parse(this.ticketCreation.AvailableToDate);
      if (startDate > endDate) {
        toastr.error('يجب ان يكون تاريخ بداية توفر التذاكر اقل من تاريخ نهاية توفرها');
        return;
      }
      if (startDate == endDate && this.ticketCreation.AvailableFromTime >= this.ticketCreation.AvailableToTime) {
        toastr.error('يجب ان يكون تاريخ بداية توفر التذاكر اقل من تاريخ نهاية توفرها طالما ان مدة توفرها يوم واحد');
        return;
      }
    }
    if (this.unlimited)
      this.ticketCreation.MaxByOrder = 0;
    jQuery.blockUI();
    this.schemaGenerator.GenerateSchema("TicketCreationViewModel").subscribe(res => {
      jQuery.unblockUI();
      this.errors = this.validator.validate(res, this.ticketCreation, true);
      if (this.errors.length == 0) {
        jQuery.blockUI();
        this.call.post('/Tickets/EditTicket', JSON.stringify(this.ticketCreation), 'json').subscribe(
          (res: any) => {
            this.ticketCreation = res;
            this.ticketCreation.EventId = res.eventId;
            jQuery.unblockUI();
            if (newTicket) {
              this.ticketCreation.AvailableFromTime = '08:00';
              this.ticketCreation.AvailableToTime = '17:00';
              this.ticketCreation.ticketId = '';
              return this.router.navigate(['/events/create-3', this.ticketCreation.EventId]);
            }
            return this.router.navigate(['/events/create-4', this.ticketCreation.EventId]);
          });
      }
      jQuery.unblockUI();
    });
  }

  isFreeChange(): void {
    this.ticketCreation.IsFree = !this.ticketCreation.IsFree;
    if (this.ticketCreation.IsFree) {
      this.ticketCreation.Price = 0;
    }
  }

  unlimitedChange(): void {
    this.unlimited = !this.unlimited;
    if (this.unlimited) {
      this.ticketCreation.MaxByOrder = 0;
    }
  }

  getToday() {
    this.fromToday = !this.fromToday;
    this.ticketCreation.AvailableFromDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dateOption1.disabled=this.fromToday;
  }

  getEnd() {
    this.toEnd = !this.toEnd;
    this.ticketCreation.AvailableToDate = this.datePipe.transform(this.ticketCreation.EventEndDate, 'yyyy-MM-dd');
    this.dateOption2.disabled=this.toEnd;
  }
  addQuestion() {
    this.ticketCreation.Questions.push(<Question>{})
  }
  removeQuestion(question: Question) {
    question.IsDeleted=true;
  }
}
