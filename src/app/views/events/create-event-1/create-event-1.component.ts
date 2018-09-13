import {Component, OnInit} from '@angular/core';
import {CreateEventStep1Model} from "../../../models/eventscreationworkflow/createEventStep1Model";
import {EventCategory} from "../../../models/eventcategory";
import {ActivatedRoute, Router} from '@angular/router';
import {CallService} from '../../../services/call.service';
import {Location} from "../../../models/location";
import {EventType} from "../../../models/eventType";
import {ValidatorService} from '../../../services/validator.service';
import {SchemaGeneratorService} from '../../../services/schema-generator.service';
import {DatePipe, Time} from "@angular/common";
import {DateOptions} from "../../../controls/pick-date/date-options";
import {Common} from "../../../classes/common";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare let jQuery: any;

declare const toastr: any;

@Component({
  selector: 'app-create-event-1',
  templateUrl: './create-event-1.component.html'
})
export class CreateEvent1Component implements OnInit {
  public model: CreateEventStep1Model = <CreateEventStep1Model>{};
  public CategoryList: Array<EventCategory>;
  public EventTypeList: Array<EventType>;

  public errors: any[] = null;
  public dateOption: DateOptions = <DateOptions>{};
  public defaultModal: any;

  constructor(private call: CallService, private route: ActivatedRoute, private router: Router
    , private validator: ValidatorService, private title: Title, private translateService: TranslateService,
              private schemaGenerator: SchemaGeneratorService, private datePipe: DatePipe) {
    this.defaultModal = Common.getQuillModel();
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('CreateEvent1'));


  }

  ngOnInit() {
    jQuery.blockUI();
    this.model.Location = <Location>{};
    this.model.Id = this.route.snapshot.paramMap.get('id');
    if (this.model.Id) {
      this.getEventData(this.model.Id);
    }
    else {
      this.model.StartTime = '08:00';
      this.model.EndTime = '17:00';
    }
    this.getEventCategoryList();
    jQuery.unblockUI();
  }


  getEventCategoryList() {
    this.call.get('/Events/GetCategoriesAndTypesLists', null, 'json').subscribe(
      (res: any) => {
        this.CategoryList = res.EventCategory;
        this.EventTypeList = res.EventType;
        if (this.model.StartDate)
          this.model.StartDate = this.datePipe.transform(this.model.StartDate, 'yyyy-MM-dd');
        if (this.model.EndDate)
          this.model.EndDate = this.datePipe.transform(this.model.EndDate, 'yyyy-MM-dd');
      });
  }

  compareCategoryFn(a, b) {
    if (a != undefined && b != undefined && a.Id == b.Id) return true;
  }

  getEventData(EventID: string) {
    jQuery.blockUI();
    this.call.get('/Events/GetCreateEventStep1Model?EventID=' + EventID, null, 'json').subscribe(
      (res: any) => {
        if (res === 401) {
          jQuery.unblockUI();
          return this.router.navigateByUrl('/dashboard');
        }
        jQuery.unblockUI();
        this.model = res;
      });
  }

  updateData(e) {
    this.model.Location.Latitude = e.latitude;
    this.model.Location.Longitude = e.longitude;
    this.model.Location.CityName = e.city;
    this.model.Location.StateName = e.state;
    this.model.Location.CountryName = e.country;
    this.model.Location.FullAddress = e.fullAddress;
  }

  SaveEventStep1() {
    if (this.model.StartDate && this.model.EndDate) {
      let startDate: number = Date.parse(this.model.StartDate);
      let endDate: number = Date.parse(this.model.EndDate);
      if (startDate > endDate) {
        toastr.error('يجب ان يكون تاريخ بداية الحدث اقل من تاريخ نهايته');
        return;
      }
      if (startDate == endDate && this.model.StartTime >= this.model.EndTime) {
        toastr.error('يجب ان يكون توقيت بداية الحدث اقل من توقيت نهايته طالما ان مدة الحدث يوم واحد');
        return;
      }
    }
    jQuery.blockUI();
    this.schemaGenerator.GenerateSchema("CreateEventStep1ViewModel").subscribe(res => {
      jQuery.unblockUI();
      this.errors = this.validator.validate(res, this.model, true);
      if (this.errors.length == 0) {
        jQuery.blockUI();
        this.call.post('/Events/CreateEventStep1', JSON.stringify(this.model), 'json').subscribe(
          (res: any) => {
            this.model = res;
            jQuery.unblockUI();
            this.router.navigate(['/events/create-2', this.model.Id]);
          });
      }
    });

  }
}
