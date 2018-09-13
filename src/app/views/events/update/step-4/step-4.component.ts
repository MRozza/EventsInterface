import {Component, Input, OnInit} from '@angular/core';
import {EventSettings} from "../../../../models/eventSettings";
import {ActivatedRoute, Router} from "@angular/router";
import {CallService} from "../../../../services/call.service";
import {SchemaGeneratorService} from "../../../../services/schema-generator.service";
import {ValidatorService} from "../../../../services/validator.service";
import {Common} from "../../../../classes/common";

declare let jQuery: any;

@Component({
  selector: 'app-step-4',
  templateUrl: './step-4.component.html'
})
export class Step4Component implements OnInit {

  @Input() public eventSettings: EventSettings = <EventSettings>{};
  public errors: any[] = null;
  public unlimited: boolean = false;
  public options: any;
  public defaultModal: any;


  constructor(private call: CallService, private route: ActivatedRoute, private router: Router,
              private validator: ValidatorService, private schemaGenerator: SchemaGeneratorService) {
    this.defaultModal = Common.getQuillModel();

    this.options = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'paragraphFormat', 'alert'],
    };
  }

  ngOnInit() {
    this.eventSettings = <EventSettings>{};
    this.eventSettings.Id = this.route.snapshot.paramMap.get('id');
    if (this.eventSettings.Id) {
      this.call.get('/Events/GetEventSettings?eventID=' + this.eventSettings.Id, null, 'json').subscribe(
        (res: any) => {
          this.eventSettings = res;
          this.unlimited = this.eventSettings.EventCapacity === 0;
        });
    }
  }

  submit() {
    jQuery.blockUI();

    if (this.unlimited) {
      this.eventSettings.EventCapacity = 0;

    }

    this.schemaGenerator.GenerateSchema("EventSettingsViewModel").subscribe(res => {
      this.errors = this.validator.validate(res, this.eventSettings, true);
      if (this.errors.length == 0) {
        this.call.post('/Events/EditEventSettings', JSON.stringify(this.eventSettings), 'json').subscribe(
          (res: any) => {
            this.eventSettings = res;
            jQuery.unblockUI();

            return this.router.navigate(['/manage/event', this.eventSettings.Id]);
          });
      } else {
        jQuery.unblockUI();

      }
    });
  }

}
