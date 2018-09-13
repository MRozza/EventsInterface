import {Component, OnInit} from '@angular/core';
import {SelectOption} from "../../../interfaces/select-option";
import {ValidatorService} from "../../../services/validator.service";
import {SchemaGeneratorService} from "../../../services/schema-generator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {City} from "../../../models/city";
import {forEach} from "@angular/router/src/utils/collection";
import {DateOption} from "../../../interfaces/date-option";
import {DateOutput} from "../../../interfaces/date-output";
import {EventType} from "../../../models/eventType";
import {Search} from "../../../models/search";
import {EventListItem} from "../../../models/eventListItem";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";
declare const jQuery: any;


@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html'
})
export class UpcomingEventsComponent implements OnInit {

  public locationsSelection: SelectOption[] = [];
  public CitiesList: City[];
  public eventType: SelectOption[] = [];
  public DatesList: DateOption[] = [];
  public eventTypes: EventType[] = [];
  public eventCats: SelectOption[] = [];
  public eventCategories: EventType[] = [];
  public eventsList: Array<EventListItem> = [];

  public searchModel: Search = <Search>{};

  public paginationCount: number = 8;
  public paginationCurrent: number = 0;
  public paginationData: Array<EventListItem> = [];

  constructor(private title: Title,private translateService:TranslateService,private call: CallService, private route: ActivatedRoute, private router: Router) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('UpcomingEvents'));

  }

  selectedTypeChanged(data) {
    this.searchModel.EventTypes = '';
    for (let i = 0; i < this.eventType.length; i++)
      this.searchModel.EventTypes += (this.eventType[i].selected) ? ((this.searchModel.EventTypes == '') ? '' : ',') + this.eventType[i].id.toString() : '';

    this.ApplySearchModel();
  }

  selectedCategoryChanged(data) {
    this.searchModel.EventCategory = '';
    for (let i = 0; i < this.eventCats.length; i++)
      this.searchModel.EventCategory += (this.eventCats[i].selected) ? ((this.searchModel.EventCategory == '') ? '' : ',') + this.eventCats[i].id.toString() : '';

    this.ApplySearchModel();
  }

  dateOptionChanged(dateoption) {

    let date: any = new Date();
    switch (dateoption.dateOption.id) {
      case 1: //any time
        this.searchModel.DateFrom = '';
        this.searchModel.DateTo = '';
        break;
      case 2: //Today
        this.searchModel.DateFrom = new Date(Date.now()).toLocaleDateString();
        this.searchModel.DateTo = new Date(Date.now()).toLocaleDateString();
        break;
      case 3: //Tomorrow
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.searchModel.DateFrom = tomorrow.toLocaleDateString();
        this.searchModel.DateTo = tomorrow.toLocaleDateString();
        break;
      case 4: //This Week
        this.searchModel.DateFrom = new Date(Date.now()).toLocaleDateString();
        this.searchModel.DateTo = this.nextDay(5).toLocaleDateString();
        break;
      case 5: //This weekend
        this.searchModel.DateFrom = this.nextDay(5).toLocaleDateString();
        this.searchModel.DateTo = this.nextDay(6).toLocaleDateString();
        break;
      case 6:

        let nextWeekStart = date.getDate() - date.getDay() + 7;
        let nextWeekFrom = new Date(date.setDate(nextWeekStart));
        let nextWeekEnd = date.getDate() - date.getDay() + 6;
        let nextWeekTo = new Date(date.setDate(nextWeekEnd));

        this.searchModel.DateFrom = nextWeekFrom.toLocaleDateString();
        this.searchModel.DateTo = nextWeekTo.toLocaleDateString();
        break;
      case 7:
        let y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(y, m, 1);
        let lastDay = new Date(y, m + 1, 0);

        this.searchModel.DateFrom = firstDay.toLocaleDateString();
        this.searchModel.DateTo = lastDay.toLocaleDateString();
        break;
      case 8: //Custom dates
        this.searchModel.DateFrom = dateoption.StartDate.toString();
        this.searchModel.DateTo = dateoption.EndDate.toString();
        break;
    }
    this.ApplySearchModel();
  }

  private nextPage(): void {
    this.paginationData = this.eventsList.slice(0, ((this.paginationCurrent * this.paginationCount) + this.paginationCount));
    this.paginationCurrent++;
  }

  LocationsChanged(data) {
    this.searchModel.Locations = '';
    for (let i = 0; i < data.length; i++)
      this.searchModel.Locations += ((this.searchModel.Locations == '') ? '' : ',') + '\'' + data[i].text + '\'';

    this.ApplySearchModel();
  }

  ApplySearchModel() {
    jQuery.blockUI();
    this.call.post('/Events/ListAllEvents', JSON.stringify(this.searchModel), 'json').subscribe((res: any) => {
      this.paginationCurrent = 0;

      this.eventsList = res;

      this.nextPage();

    });
    jQuery.unblockUI();
  }

  nextDay(DayOfTheWeek) {
    let now = new Date();
    now.setDate(now.getDate() + (DayOfTheWeek + (7 - now.getDay())) % 7);
    return now;
  }

  getEventCategoryList() {
    this.call.get('/Events/GetCategoriesAndTypesLists', null, 'json').subscribe(
      (res: any) => {
        this.CitiesList = res.cities;
        for (let entry of this.CitiesList) {
          this.locationsSelection.push(<SelectOption>{text: entry.cityname, id: entry.cityname});
        }

        this.eventTypes = res.EventType;
        for (let entry of this.eventTypes) {
          this.eventType.push(<SelectOption>{text: entry.Name, id: entry.Id, selected: false});
        }

        this.eventCategories = res.EventCategory;
        for (let entry of this.eventCategories) {
          this.eventCats.push(<SelectOption>{text: entry.Name, id: entry.Id, selected: false});
        }


      });
  }

  FillDateOptions() {
    this.DatesList.push(<DateOption>{id: 1, text: 'AllDates', selected: false});
    this.DatesList.push(<DateOption>{id: 2, text: 'Today', selected: false});
    this.DatesList.push(<DateOption>{id: 3, text: 'Tomorrow', selected: false});
    this.DatesList.push(<DateOption>{id: 4, text: 'ThisWeek', selected: false});
    this.DatesList.push(<DateOption>{id: 5, text: 'ThisWeekend', selected: false});
    this.DatesList.push(<DateOption>{id: 6, text: 'NextWeek', selected: false});
    this.DatesList.push(<DateOption>{id: 7, text: 'ThisMonth', selected: false});
    this.DatesList.push(<DateOption>{id: 8, text: 'CustomDate', selected: false});
  }

  ngOnInit() {
    jQuery.blockUI();
    this.route.queryParams.subscribe(params => {
     if(params['q']){
       this.searchModel.EventTitle=params['q'];
     }
    });
    this.getEventCategoryList();
    this.FillDateOptions();
    this.ApplySearchModel();
    jQuery.unblockUI();
  }

}
