import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {CallService} from "../../../services/call.service";
import {SchemaGeneratorService} from "../../../services/schema-generator.service";
import {ValidatorService} from "../../../services/validator.service";
import {Contact} from "../../../models/contact";
import {DateOptions} from "../../../controls/pick-date/date-options";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

declare const jQuery: any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings-info.component.html'
})
export class AccountSettingsInfoComponent implements OnInit {
  public User: User = <User>{};
  public errorsList: string[] = [];
  public errors: any[] = null;
  submitted = false;
  public dateOption: DateOptions = <DateOptions>{};
  public size: number = 0;
  public type: string = '';

  constructor(private call: CallService, private validator: ValidatorService,private title: Title,private translateService:TranslateService,
              private schemaGenerator: SchemaGeneratorService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('AccountSettingsInfo'));

  }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('user'));
    if (!this.User.Contact)
      this.User.Contact = <Contact>{};
  }

  fileChangeEvent(e) {
    this.size = e.target.files.size;
    this.type = e.target.files.type;
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this)
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.User.Contact.ProfilePicture = binaryString;
  }

  onSubmit() {
    this.errorsList = [];
    this.submitted = true;
    // TODO: Add ajv Validation
    this.schemaGenerator.GenerateSchema("UserViewModel").subscribe(res => {
      this.errors = this.validator.validate(res, this.User, true);
      if (this.errors.length == 0) {
        jQuery.blockUI();
        this.call.post('/users/EditProfileInfo', this.User, 'json')
          .subscribe(res => {
            localStorage.setItem('user', JSON.stringify(this.User));
            jQuery.unblockUI();
          });
      }
    });


  }
}
