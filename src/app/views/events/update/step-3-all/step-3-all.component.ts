import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketCreation} from "../../../../models/ticketCreation";
import {ValidatorService} from "../../../../services/validator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {SchemaGeneratorService} from "../../../../services/schema-generator.service";
import {DatePipe} from "@angular/common";
import {DateOptions} from "../../../../controls/pick-date/date-options";
import {Common} from "../../../../classes/common";
declare let jQuery: any;

@Component({
  selector: 'app-step-3-all',
  templateUrl: './step-3-all.component.html'
})
export class Step3AllComponent implements OnInit {
  @Input() public tickets:Array<TicketCreation>=<Array<TicketCreation>>[];
  @Output() public showAllTickets: EventEmitter<any> = new EventEmitter<any>();
  @Input() pushToArray=false;
public data:any=<any>{};

  constructor(private call: CallService, private route: ActivatedRoute, private router: Router,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService, private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  click(ticket: TicketCreation) {
    this.data.showAll=false;
    this.data.ticketCreation=ticket;
    this.pushToArray=false;
    this.showAllTickets.emit(this.data);
  }

}
