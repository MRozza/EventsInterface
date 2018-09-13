import {Component, OnInit} from '@angular/core';
import {CallService} from "../../services/call.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Search} from "../../models/search";
import {EventListItem} from "../../models/eventListItem";
import {ContactUs} from "../../models/contactUs";
import {TranslateService} from "../../components/translation";
import {SchemaGeneratorService} from "../../services/schema-generator.service";
import {ValidatorService} from "../../services/validator.service";
import {Common} from "../../classes/common";
import {Title} from "@angular/platform-browser";

declare const jQuery: any;
declare let moment: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public eventsList: Array<EventListItem> = [];
  public searchmodel: Search;
  public contactUs: ContactUs = <ContactUs>{};
  public errors: any[] = null;
  public defaultModal: any;

  public paginationCount: number = 8;
  public paginationCurrent: number = 0;
  public paginationData: Array<EventListItem> = [];
  public queryStringParam: string = '';

  constructor(private call: CallService, private authenticationService: AuthService, private title: Title,private translateService:TranslateService,
              private router: Router, private validator: ValidatorService,
              private schemaGenerator: SchemaGeneratorService) {
    this.defaultModal = Common.getQuillModel();
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('dashboard'));
  }

  ngOnInit() {
    jQuery.blockUI();
    this.call.post('/Events/ListAllEvents', JSON.stringify(this.searchmodel), 'json').subscribe((res: any[]) => {
      this.paginationCurrent = 0;
      this.eventsList = res;
      moment.locale('ar');
      res.forEach((e: any) => {
        e.DateText = moment(e.StartDate).format('LL');
      });

      this.nextPage();
      jQuery.unblockUI();
    });
  }

  private nextPage(): void {
    this.paginationData = this.eventsList.slice(0, ((this.paginationCurrent * this.paginationCount) + this.paginationCount));
    this.paginationCurrent++;
  }

  LogEventList() {
    this.nextPage();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  sendMsg() {
    this.schemaGenerator.GenerateSchema("ContactUsViewModel").subscribe(res => {
      this.errors = this.validator.validate(res, this.contactUs, true);
      if (this.errors.length == 0) {

        this.call.post('/Home/ContactUs', this.contactUs, 'json').subscribe(
          (res: any) => {
            //TODO
          });
      }
    });
  }
}
