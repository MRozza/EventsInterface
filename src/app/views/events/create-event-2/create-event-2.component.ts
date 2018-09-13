import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CallService} from '../../../services/call.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidatorService} from '../../../services/validator.service';
import {SchemaGeneratorService} from '../../../services/schema-generator.service';
import {EventTemplate} from "../../../models/eventTemplate";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare const toastr: any;

declare let jQuery: any;

@Component({
  selector: 'app-create-event-2',
  templateUrl: './create-event-2.component.html'
})
export class CreateEvent2Component implements OnInit {
  @ViewChild('img') img: ElementRef;
  public size: number = 0;
  public color: string = '#FFFFFF';
  public isLogo: boolean = false;
  public eventTemplate: EventTemplate = <EventTemplate>{};
  public errors: any[] = null;
  public opacity: string;

  constructor(private title: Title, private translateService: TranslateService, private call: CallService, private route: ActivatedRoute
    , private router: Router
    , private validator: ValidatorService
    , private schemaGenerator: SchemaGeneratorService) {
    title.setTitle(this.translateService.translate('siteName') + ' | ' + this.translateService.translate('CreateEvent2'));
  }

  ngOnInit() {
    jQuery.blockUI();
    this.eventTemplate.EventId = this.route.snapshot.paramMap.get('id');
    this.call.get('/Events/GetEventTemplate?eventID=' + this.eventTemplate.EventId, null, 'json').subscribe(
      (res: any) => {
        if(res===401) {
          jQuery.unblockUI();
          return this.router.navigateByUrl('/dashboard');
        }
        jQuery.unblockUI();
        this.eventTemplate = res;
        this.img.nativeElement.style.opacity = Number(this.eventTemplate.CoverImageOpacity) / 10;
      });
  }

  fileChangeEvent(e, isLogo: boolean) {
    this.isLogo = isLogo;
    if (this.isLogo) {
      this.eventTemplate.LogoSize = e.target.files.size;
      this.eventTemplate.LogoType = e.target.files.type;
    }
    else {
      this.eventTemplate.CoverImageSize = e.target.files.size;
      this.eventTemplate.CoverImageType = e.target.files.type;
    }
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this)
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    if (this.isLogo) {
      this.eventTemplate.Logo = binaryString;
    }
    else {
      this.eventTemplate.CoverImage = binaryString;
    }
  }

  rangeChange(e) {
    this.eventTemplate.CoverImageOpacity = e.target.value;
    this.img.nativeElement.style.opacity = Number(this.eventTemplate.CoverImageOpacity) / 10;
  }

  submit() {
    jQuery.blockUI();
    this.schemaGenerator.GenerateSchema("EventTemplateViewModel").subscribe(res => {
      jQuery.unblockUI();
      this.errors = this.validator.validate(res, this.eventTemplate, true);
      console.log(this.errors)
      if (this.errors.length == 0) {
        jQuery.blockUI();
        this.call.post('/Events/EditEventTemplate', JSON.stringify(this.eventTemplate), 'json').subscribe(
          (res: any) => {
            this.eventTemplate = res;
            this.eventTemplate.EventId = res.eventId;
            jQuery.unblockUI();
            return this.router.navigate(['/events/create-3', this.eventTemplate.EventId]);
          });
      }
    });
  }
}
