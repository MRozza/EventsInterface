import { Injectable } from '@angular/core';
import {CallService} from "./call.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {LocalStorageAccessService} from "./local-storage-access.service";
declare const toastr: any;

import {TranslateService} from "../components/translation";
//TODO
@Injectable()
export class AuthService {

  constructor(private call: CallService, private router: Router, private accessStorage: LocalStorageAccessService, private lang: TranslateService) { }

  register(user: User, returnUrl: string):any {
    return this.call.post('/users/Register', JSON.stringify(user), 'json').subscribe(
      (res:any)=>{
        user =res.user;
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.accessStorage.setItem = JSON.stringify(user); // assign a value to subscribe to
          localStorage.setItem('eventsToken', res.access_token);
          localStorage.setItem('user', JSON.stringify(user));
          toastr.info(this.lang.translate('signedIn'), null);
          this.router.navigate([returnUrl]);
          return true;
        }
        return false;
      });
  }

  login(data: any, returnUrl: string):any {
    return this.call.post('/users/Login', JSON.stringify(data), 'json').subscribe(
      (res:any)=>{
        let user : User =res.user;
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.accessStorage.setItem = JSON.stringify(user); // assign a value to subscribe to
          localStorage.setItem('eventsToken', res.access_token);
          localStorage.setItem('user', JSON.stringify(user));
          toastr.info(this.lang.translate('signedIn'));
          this.router.navigate([returnUrl]);
          return true;
        }
        return false;
      });
  }

  logout() {
    // remove user & token from local storage on logging out
    localStorage.removeItem('user');
    localStorage.removeItem('eventsToken');
    toastr.info(this.lang.translate('signedOut'));
  }
}
