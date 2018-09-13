import {Component, OnInit} from '@angular/core';
import {ValidatorService} from "../../services/validator.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "../../components/translation";
import {SchemaGeneratorService} from "../../services/schema-generator.service";
import {Title} from "@angular/platform-browser";
declare const toastr: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public data: any = {};
  public errors: any[] = null;
  submitted: boolean = false;
  returnUrl: string;

  constructor(private title: Title,private translateService:TranslateService,private validator: ValidatorService, private auth: AuthService, private route: ActivatedRoute, private lang: TranslateService, private router: Router,
              private schemaGenerator: SchemaGeneratorService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('login'));

  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      setTimeout(() => toastr.info(this.lang.instant('alreadyLoggedIn')));
      this.router.navigate(['/dashboard']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.schemaGenerator.GenerateSchema("LoginViewModel").subscribe(res => {
      this.errors = this.validator.validate(res, this.data, true);
      if (this.errors.length == 0) {
        this.submitted = true;
        this.auth.login(this.data, this.returnUrl);
      }
    });
  }
}
