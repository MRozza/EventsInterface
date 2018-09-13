import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CallService} from '../../../../services/call.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidatorService} from '../../../../services/validator.service';
import {SchemaGeneratorService} from '../../../../services/schema-generator.service';
import {EventTemplate} from "../../../../models/eventTemplate";
import {DomSanitizer} from "@angular/platform-browser";
declare let jQuery: any;


@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html'
})
export class Step2Component implements OnInit {

  @ViewChild('img') img: ElementRef = <ElementRef>{};
  //public imgSrc: string = '../../../../assets/images/empty-road-storm-sky-facebook-cover.jpg';
  public size: number = 0;
  public color: string = '#FFFFFF';
  public isLogo: boolean = false;
  @Input() public eventTemplate: EventTemplate = <EventTemplate>{};
  public errors: any[] = null;
  public opacity: string;

  constructor(private call: CallService, private route: ActivatedRoute
    , private router: Router) {

  }

  ngOnInit() {
    if (!this.eventTemplate.CoverImage) {
      this.eventTemplate.CoverImage = '../../../../assets/images/cover.jpg';
      this.eventTemplate.CoverImageType = 'image/jpeg';
      this.eventTemplate.CoverImageSize = 97999;
    }
    if (!this.eventTemplate.Logo) {
      this.eventTemplate.Logo = '../../../../assets/images/events-logo-40.png';
      this.eventTemplate.LogoType = 'image/png';
      this.eventTemplate.LogoSize = 10999;
    }
    this.img.nativeElement.style.opacity = Number(this.eventTemplate.CoverImageOpacity) / 10;
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

    this.call.post('/Events/EditEventTemplate', JSON.stringify(this.eventTemplate), 'json').subscribe(
      (res: any) => {
        this.eventTemplate = res;
        this.eventTemplate.EventId = res.eventId;
        jQuery.unblockUI();

        return this.router.navigate(['/manage/event', this.eventTemplate.EventId]);
      });
  }

}
