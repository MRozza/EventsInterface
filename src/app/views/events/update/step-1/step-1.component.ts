import {Component, Input, OnInit} from '@angular/core';
import {CreateEventStep1Model} from "../../../../models/eventscreationworkflow/createEventStep1Model";
import {EventCategory} from "../../../../models/eventcategory";
import {ActivatedRoute, Router} from '@angular/router';
import {CallService} from '../../../../services/call.service';
import {EventType} from "../../../../models/eventType";
import {ValidatorService} from '../../../../services/validator.service';
import {SchemaGeneratorService} from '../../../../services/schema-generator.service';
import {Common} from "../../../../classes/common";
import {DateOptions} from "../../../../controls/pick-date/date-options";
declare const toastr: any;

declare let jQuery: any;

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html'
})
export class Step1Component implements OnInit {
  @Input() public model: CreateEventStep1Model = <CreateEventStep1Model>{};
  public CategoryList: Array<EventCategory>;
  public EventTypeList: Array<EventType>;
  public quillModel: any;
  public dateOption: DateOptions = <DateOptions>{};

  public errors: any[] = null;

  constructor(private call: CallService, private route: ActivatedRoute, private router: Router
    , private validator: ValidatorService,
              private schemaGenerator: SchemaGeneratorService) {
    this.quillModel = Common.getQuillModel();

  }

  ngOnInit() {
    this.getEventCategoryList();
  }


  getEventCategoryList() {
    this.call.get('/Events/GetCategoriesAndTypesLists', null, 'json').subscribe(
      (res: any) => {
        this.CategoryList = res.EventCategory;
        this.EventTypeList = res.EventType;
      });
  }

  compareCategoryFn(a, b) {
    if (a != undefined && b != undefined && a.Id == b.Id) return true;
  }


  UpdateDates(e, modelProp) {
    if (modelProp == 'EndDate')
      this.model.EndDate = e.target.value;
    else if (modelProp == 'StartDate')
      this.model.StartDate = e.target.value;
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
      this.errors = this.validator.validate(res, this.model, true);
      if (this.errors.length == 0) {
        this.call.post('/Events/CreateEventStep1', JSON.stringify(this.model), 'json').subscribe(
          (res: any) => {
            this.model = res;
            this.router.navigate(['/manage/event', this.model.Id]);
            jQuery.unblockUI();

          });
      } else {
        jQuery.unblockUI();

      }
    });
  }

}
