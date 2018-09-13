import { Component } from '@angular/core';
import {TranslateService} from "./components/translation";
declare const toastr: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'app';
  lang:string='ar';
  constructor(private translate: TranslateService) {
    toastr.options.rtl = true;
    toastr.options.positionClass = 'toast-top-left';
    translate.use(this.lang);
  }
}
