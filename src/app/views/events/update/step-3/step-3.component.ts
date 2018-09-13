import {Component, Input, OnInit} from '@angular/core';
import {TicketCreation} from "../../../../models/ticketCreation";
import {ValidatorService} from "../../../../services/validator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {SchemaGeneratorService} from "../../../../services/schema-generator.service";
import {DatePipe} from "@angular/common";
import {DateOptions} from "../../../../controls/pick-date/date-options";
import {Common} from "../../../../classes/common";
import {Question} from "../../../../models/Survey";

declare let jQuery: any;

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html'
})
export class Step3Component implements OnInit {

  @Input() public ticketCreation: TicketCreation = <TicketCreation>{};
  public unlimited: boolean = true;
  public errors: any[] = null;
  public options: any;
  public dateOption1: DateOptions = <DateOptions>{};
  public dateOption2: DateOptions = <DateOptions>{};
  public defaultModal: any;
  @Input() public tickets:Array<TicketCreation>=<Array<TicketCreation>>[];
  @Input() public pushToArray=false;
  @Input() public showAllTickets:boolean=true;
  public fromToday: boolean = false;
  public toEnd: boolean = false;

  constructor(private call: CallService, private route: ActivatedRoute, private router: Router,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService, private datePipe: DatePipe) {
    this.defaultModal = Common.getQuillModel();
    this.options = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
    };
    this.ticketCreation.MaxByOrder = 0;
  }

  ngOnInit() {
    jQuery.blockUI();
    console.log(this.ticketCreation.Questions)
    this.ticketCreation.EventId = this.route.snapshot.paramMap.get('id');
    this.call.get('/Tickets/GetEventEndDate?eventId=' + this.ticketCreation.EventId, null, 'json').subscribe(
      (res: any) => {
        this.ticketCreation.EventEndDate = JSON.parse(res).result;
        jQuery.unblockUI();
      });
  }

  submit() {
    jQuery.blockUI();

    if (this.unlimited)
      this.ticketCreation.MaxByOrder = 0;
    this.schemaGenerator.GenerateSchema("TicketCreationViewModel").subscribe(res => {
      this.errors = this.validator.validate(res, this.ticketCreation, true);
      console.log(this.errors)
      if (this.errors.length == 0) {
        this.call.post('/Tickets/EditTicket', JSON.stringify(this.ticketCreation), 'json').subscribe(
          (res: any) => {
            this.ticketCreation = res;
            this.ticketCreation.EventId = res.eventId;

            jQuery.unblockUI();
            this.showAllTickets = true;
            this.ticketCreation.AvailableFromTime = '08:00';
            this.ticketCreation.AvailableToTime = '17:00';
            this.ticketCreation.ticketId = '';
            this.reload();
          });
      } else {
        jQuery.unblockUI();
      }
    });
  }
  public reload(): any {
    window.location.reload();
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
