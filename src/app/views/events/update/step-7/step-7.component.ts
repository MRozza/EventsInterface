///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {Analytics} from "../../../../models/analytics";

declare let jQuery: any;

@Component({
  selector: 'app-step-7',
  templateUrl: './step-7.component.html'
})
export class Step7Component implements OnInit {

  public analytics:Analytics;
  @Input() uId: string;

  constructor(private call: CallService, private route: ActivatedRoute, private router:Router) {
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public months=["يناير",  "فبراير",  "مارس",  "أبريل",  "مايو",  "يونيو",  "يوليو",  "أغسطس",  "سبتمبر",  "أكتوبر",  "نوفمبر",  "ديسمبر"];
  public year=["2012",  "2013",  "2014",  "2015",  "2016",  "2017",  "2018",  "2019",  "2020",  "2021",  "2022",  "2023"];
  public monthSelected=6;
  public yearSelected=2018;
  public barChartLabels:Array<string> =<Array<string>> [];
  public data1:Array<number> =<Array<number>> [];
  public data2:Array<number> =<Array<number>> [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: this.data1, label: 'زيارات الصفحة'},
    {data: this.data2, label: 'مبيعات التذاكر'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public getData():void {
    this.populateData(this.daysRemainingInMonth());
  }
   daysRemainingInMonth() {
     return new Date(this.yearSelected, this.monthSelected, 0).getDate();
  }
  ngOnInit() {
    this.monthSelected=new Date().getMonth()+1;
    this.yearSelected=new Date().getFullYear();
    this.populateData(new Date());
  }
populateData(date)
{
this.barChartLabels=<Array<string>> [];
this.data1 =<Array<number>> [];
this.data2 =<Array<number>> [];
  if (this.uId) {
    let x=this.daysRemainingInMonth();
    for (let i = 1; i <= x; i++) {
      this.barChartLabels.push(i.toString());
      this.data1.push(0);
      this.data2.push(0);
    }
    this.call.get('/Users/Analytics?eventId=' + this.uId+'&month='+this.monthSelected+'&year='+this.yearSelected, null, 'json').subscribe(
      (res: any) => {
        if(res===401)
          return this.router.navigateByUrl('/dashboard');
        this.analytics = res;
        if(this.analytics&&this.analytics.visits)
        {
          this.analytics.visits.forEach(item=>{
            this.data1[(item.day-1)]=item.visits;
          })
        }
        if(this.analytics&&this.analytics.tickets)
        {
          this.analytics.tickets.forEach(item=>{
            this.data2[(item.day-1)]=item.tickets;
          })
        }
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = this.data1;
        clone[1].data = this.data2;
        this.barChartData = clone;
      });
  }
}
}
