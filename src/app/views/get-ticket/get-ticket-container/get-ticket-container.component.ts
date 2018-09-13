import {Component, Input, OnInit} from '@angular/core';
import {
  TicketAttendeeInfo,
  TicketAttendeeName,
  TicketPurchase,
  TicketsInfo,
  TicketsInfoName
} from "../../../models/ticketPurchase";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {SchemaGeneratorService} from "../../../services/schema-generator.service";
import {ValidatorService} from "../../../services/validator.service";
import {LocalStorageAccessService} from "../../../services/local-storage-access.service";
import {User} from "../../../models/user";
import {Answer} from "../../../models/Survey";
declare let jQuery: any;

@Component({
  selector: 'app-get-ticket-container',
  templateUrl: './get-ticket-container.component.html'
})
export class GetTicketContainerComponent implements OnInit {
  public currentStep: number = 1;
  public NumberOfTicket: number = 0;
  public currentTicketInfoNumber: number = 1;
  public buttonsName: string[] = [];
  public ticketsInfo: Array<TicketsInfo>;
  public errors: any[] = null;
  public ticketAttendeeNames: Array<TicketAttendeeName> = <Array<TicketAttendeeName>>[];
  public ticketAttendeeInfo: TicketAttendeeInfo = <TicketAttendeeInfo>{};
  public currentTicketInfo: TicketsInfo = <TicketsInfo>{};
  public user:User=<User>{};

  @Input() public ticketPurchase: TicketPurchase = <TicketPurchase>{};

  constructor(private route: ActivatedRoute, private call: CallService,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService,private localStorage:LocalStorageAccessService) {
    this.buttonsName[1] = 'checkout';
    this.buttonsName[2] = 'checkout2';
    this.buttonsName[3] = 'checkout3';
    this.buttonsName[4] = 'checkout4';
  }

  ngOnInit() {
    this.ticketsInfo = <Array<TicketsInfo>>[];
    this.currentTicketInfo.TicketsInfoName = <TicketsInfoName>{};
    this.ticketAttendeeInfo.TicketAttendeeName = this.ticketAttendeeNames;
    this.user=JSON.parse(localStorage.getItem('user'));
  }

  public nextTicket(): void {
    if (this.currentStep === 1) {
      let index = 0;
      this.ticketPurchase.TicketPurchaseData.forEach(ticket => {
        if (ticket.Quantity > 0) {
          for (let i = 0; i < ticket.Quantity; i++) {
            index++;
            let ticketInfo: TicketsInfo = <TicketsInfo>{};
            ticketInfo.TicketTitle = ticket.TicketTitle;
            ticketInfo.TicketId = ticket.TicketId;
            ticketInfo.TicketsInfoName = <TicketsInfoName>{};
            ticketInfo.Number = i + 1;
            ticketInfo.Index = index;
            ticketInfo.Questions=ticket.Questions;
            ticketInfo.TicketsInfoName.Questions=ticket.Questions;
            if(ticketInfo.TicketsInfoName.Questions) {
              ticketInfo.TicketsInfoName.Answers=<Array<Answer>>[];
              ticketInfo.TicketsInfoName.Questions.forEach(item=>
              {
                let answer:Answer=<Answer>{};
                answer.QuestionText=item.QuestionText;
                answer.QuestionId=item.Id;
                ticketInfo.TicketsInfoName.Answers.push(answer);
              })
            }
            this.ticketsInfo.push(ticketInfo);
          }
        }
      })
      this.NumberOfTicket = index;
      if (index === 0) {
        // TODO: Toast Msg
      }
      else {
        this.currentStep++;
        this.currentTicketInfo = this.ticketsInfo.filter(x => x.Number == this.currentTicketInfoNumber)[0];
      }
    }
    else if (this.currentStep === 2) {
      if (this.currentTicketInfoNumber === this.NumberOfTicket) {
        this.ticketsInfo.forEach(ticket => {
          let attendee: TicketAttendeeName = <TicketAttendeeName>{};
          attendee.FirstName = ticket.TicketsInfoName.FirstName;
          attendee.LastName = ticket.TicketsInfoName.LastName;
          attendee.TicketId = ticket.TicketId;
          attendee.Questions=ticket.Questions;
          attendee.Answers=ticket.TicketsInfoName.Answers;
          this.ticketAttendeeNames.push(attendee);
        });
        this.currentStep++;
        if(this.user) {
          this.ticketAttendeeInfo.Email =this.user.Email;
          this.ticketAttendeeInfo.Mobile=this.user.Mobile;
        }
      }
      else {
        this.schemaGenerator.GenerateSchema("TicketAttendeeNameViewModel").subscribe(res => {
          this.errors = this.validator.validate(res, this.currentTicketInfo.TicketsInfoName, true);
          if (this.errors.length == 0) {
            this.currentTicketInfoNumber++;
            this.currentTicketInfo = this.ticketsInfo.filter(x => x.Index == this.currentTicketInfoNumber)[0];
          }
        });
      }
    } else if (this.currentStep === 3) {
      jQuery.blockUI();
      this.schemaGenerator.GenerateSchema("TicketAttendeeInfoViewModel").subscribe(res => {
        this.errors = this.validator.validate(res, this.ticketAttendeeInfo, true);
        if (this.errors.length == 0) {
          this.call.post('/Tickets/PurchaseTickets', this.ticketAttendeeInfo, 'json').subscribe(
            (res: any) => {
             // this.currentStep=4;
            });
          jQuery.unblockUI();
        }
        else {jQuery.unblockUI();}
      });
    } else {
      if (this.currentStep === 4) {
//TODO: Close Modal
      }
    }
  }

}
