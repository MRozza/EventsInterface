import {Component, Input, OnInit} from '@angular/core';
import {TicketCreation} from "../../../models/ticketCreation";
import {CallService} from "../../../services/call.service";
import {ActivatedRoute} from "@angular/router";
declare let jQuery: any;

@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html'
})
export class EventTicketsComponent implements OnInit {
  @Input() public ticketCreation: TicketCreation = <TicketCreation>{};
  @Input() public tickets:Array<TicketCreation>=<Array<TicketCreation>>[];
  public pushToArray=false;
  constructor(private call:CallService,private route: ActivatedRoute){}

  public showAllTickets:boolean=true;
  ngOnInit() {
    this.pushToArray=false;
    jQuery('.event-tickets').hide();
  }
  changeView(e:any){
    this.showAllTickets=e.showAll;
    this.ticketCreation=e.ticketCreation;
}
addNewTicket()
{
  this.ticketCreation=<TicketCreation>{};
 this.ticketCreation.EventId=this.route.snapshot.paramMap.get('id');
        this.ticketCreation.AvailableFromTime = '08:00';
        this.ticketCreation.AvailableToTime = '17:00';
        this.pushToArray=true;
        this.showAllTickets=false;

}
  public hide(): void {
    this.showAllTickets=true;
    jQuery('.event-tickets').fadeOut();
  }

}
