import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare const toastr: any;
declare let jQuery: any;
declare let moment: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  public id: string;
public report:number=1;
  constructor(private title: Title, private translateService: TranslateService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('Reports'));

  }

  ngOnInit() {
    jQuery('.report-order').css('margin-right', jQuery('.drawer').width() + 'px');
    jQuery('.report-order').fadeIn();
    jQuery('.report-content').css('margin-right', (jQuery('.drawer').width()+jQuery('.report-order').width())+ 'px');
  }

}
