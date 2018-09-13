import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import { FormGroup} from "@angular/forms";
import {TranslateService} from "../../components/translation";
import {ValidatorService} from "../../services/validator.service";
import {SchemaGeneratorService} from "../../services/schema-generator.service";
import {Title} from "@angular/platform-browser";
declare const toastr: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  public User: User = <User>{};
  public errors: any[] = null;
  public errorsList: string[] = [];
  returnUrl: string;
  submitted = false;

  constructor( private auth: AuthService,private validator: ValidatorService,private title: Title,private translateService:TranslateService,
              private route: ActivatedRoute, private lang: TranslateService,
              private schemaGenerator: SchemaGeneratorService, private router:Router) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('registration'));

  }

  ngOnInit() {
    if(localStorage.getItem('user')) {
      setTimeout(() =>toastr.info(this.lang.instant('alreadyLoggedIn')));
      this.router.navigate(['/dashboard']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.errorsList = [];
    this.submitted=true;
     this.schemaGenerator.GenerateSchema("UserViewModel").subscribe(res => {
      this.errors = this.validator.validate(res,this.User,true);
     if (this.errors.length == 0) {
        this.auth.register(this.User, this.returnUrl);
      }
    });


  }
}
