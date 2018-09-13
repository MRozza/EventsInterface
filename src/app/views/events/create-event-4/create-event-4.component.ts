import {Component, OnInit} from '@angular/core';
import {EventSettings} from "../../../models/eventSettings";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../services/call.service";
import {SchemaGeneratorService} from "../../../services/schema-generator.service";
import {ValidatorService} from "../../../services/validator.service";
import {Common} from "../../../classes/common";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare const toastr: any;
declare let jQuery: any;

@Component({
  selector: 'app-create-event-4',
  templateUrl: './create-event-4.component.html'
})
export class CreateEvent4Component implements OnInit {
  public eventSettings: EventSettings = <EventSettings>{};
  public errors: any[] = null;
  public unlimited: boolean = false;
  public defaultModal: any;

  constructor(private title: Title, private translateService: TranslateService, private call: CallService, private route: ActivatedRoute, private router: Router,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService) {
    this.defaultModal = Common.getQuillModel();
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('CreateEvent4'));

  }

  ngOnInit() {
    jQuery.blockUI();
    this.eventSettings = <EventSettings>{};
    this.eventSettings.Id = this.route.snapshot.paramMap.get('id');
    if (this.eventSettings.Id) {
      this.call.get('/Events/GetEventSettings?eventID=' + this.eventSettings.Id, null, 'json').subscribe(
        (res: any) => {
          if (res === 401) {
            jQuery.unblockUI();
            return this.router.navigateByUrl('/dashboard');
          }
          jQuery.unblockUI();
          this.eventSettings = res;
          this.unlimited = this.eventSettings.EventCapacity === 0;
        });
    }
  }

  submit() {
    if (this.unlimited)
      this.eventSettings.EventCapacity = 0;
    jQuery.blockUI();
    this.schemaGenerator.GenerateSchema("EventSettingsViewModel").subscribe(res => {
      jQuery.unblockUI();
      this.errors = this.validator.validate(res, this.eventSettings, true);
      if (this.errors.length == 0) {
        jQuery.blockUI();
        this.call.post('/Events/EditEventSettings', JSON.stringify(this.eventSettings), 'json').subscribe(
          (res: any) => {
            let _id: string = this.eventSettings.Id;
            this.eventSettings = res;
            jQuery.unblockUI();
            return this.router.navigate(['/manage/event/' + _id]);
          });
      }

    });
  }

}
