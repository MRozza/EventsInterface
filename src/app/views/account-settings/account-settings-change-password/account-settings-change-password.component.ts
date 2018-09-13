import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {CallService} from "../../../services/call.service";
import {ValidatorService} from "../../../services/validator.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

@Component({
  selector: 'app-account-settings-change-password',
  templateUrl: './account-settings-change-password.component.html'
})
export class AccountSettingsChangePasswordComponent implements OnInit {
  public user: User =<User>{};
  public errorsList: string[] = [];
  public data:any={};
  submitted = false;
  public errors: any[] = null;
  constructor(private call:CallService,title: Title,private translateService:TranslateService,private validator: ValidatorService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('AccountSettingsChangePassword'));

  }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user').toLowerCase());
  }
  onSubmit() {
    this.errorsList = [];
    this.submitted=true;
    this.user.Password=this.data.password
    var schema={
      "required": [
        "oldPassword",
        "password",
        "passwordConfirm"
      ],
      "properties": {
        "oldPassword": {
          "type": "string"
        },
        "password": {
          "minLength": 6,
          "type": "string"
        },
        "passwordConfirm": {
          "const": {
            "$data": "1/password"
          },
          "type": "string"
        }
      },
      "type": "object"
    }
    // TODO: Add ajv Validation
       this.errors = this.validator.validate(schema,this.data,true);
    if (this.errors.length == 0) {

    this.call.post('/users/ChangePassword',this.data,'json')
      .subscribe(res=> {
        //localStorage.setItem('user',JSON.stringify(this.user));
        //console.log(res)
      });
    }
    // });


  }
}
