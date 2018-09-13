import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {Order} from "../../../../models/reports";
import {DataTableResource} from "angular5-data-table";

declare let jQuery: any;

@Component({
  selector: 'app-step-5',
  templateUrl: './step-5.component.html'
})
export class Step5Component implements OnInit,OnChanges {

  @Input() public orders: Array<Order> = <Array<Order>>[];
  @Input() uId: string;
  public errors: any[] = null;
  public unlimited: boolean = false;
  public options: any;
  public defaultModal: any;
  itemResource = new DataTableResource(this.orders);
  items = [];
  itemCount = 0;

  constructor(private call: CallService, private route: ActivatedRoute, private router:Router) {
  }

  ngOnChanges(ele: SimpleChanges) {
    if (ele.uId && this.uId) {
      this.call.get('/Users/OrdersList?eventId=' + this.uId, null, 'json').subscribe(
        (res: any) => {
          if(res===401)
            return this.router.navigateByUrl('/dashboard');
          this.orders = res;

            this.itemResource = new DataTableResource(res);
            this.itemResource.count().then(count => this.itemCount = count);
            this.reloadItems({offset: 0, limit: 10})
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
