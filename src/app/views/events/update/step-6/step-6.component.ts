///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {DataTableResource} from "angular5-data-table";
import {Sales} from "../../../../models/sales";

declare let jQuery: any;

@Component({
  selector: 'app-step-6',
  templateUrl: './step-6.component.html'
})
export class Step6Component implements OnInit,OnChanges {

  public sales: Array<Sales> = <Array<Sales>>[];
  @Input() uId: string;
  itemResource = new DataTableResource(this.sales);
  items = [];
  itemCount = 0;
totalSales: number=0;
totalAttendees : number=0;
  totalVisits:number=0;
  constructor(private call: CallService, private route: ActivatedRoute, private router:Router) {
  }

  ngOnChanges(ele: SimpleChanges) {
    if (ele.uId && this.uId) {
      this.call.get('/Users/SalesList?eventId=' + this.uId, null, 'json').subscribe(
        (res: any) => {
          if(res===401)
            return this.router.navigateByUrl('/dashboard');
          this.sales = res;
          console.log(this.sales)
          console.log(res)
          this.itemResource = new DataTableResource(res);
          this.itemResource.count().then(count => this.itemCount = count);
          this.reloadItems({offset: 0, limit: 10});
          this.sales.forEach(item=>{
            if(item.attendees)
              this.totalAttendees+=Number(item.attendees);
            if(item.amount)
              this.totalSales+=Number(item.amount);
            if(item.visits)
              this.totalVisits=Number(item.visits);
          })
        });
    }
  }

  ngOnInit() {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:

  rowClick(rowEvent) {
    //TODO: know what to do!!!
    console.log('Clicked: ' + JSON.stringify(rowEvent.row.item));
  }

  rowDoubleClick(rowEvent) {
    //alert('Double clicked: ' + rowEvent.row.item);
  }

  rowTooltip(item) {
    return item.ticketNumber;
  }
}
