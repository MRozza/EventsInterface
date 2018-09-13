import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LocalStorageAccessService} from "./local-storage-access.service";
import {TranslateService} from "../components/translation";
import {User} from "../models/user";
declare const toastr: any;

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private accessStorage: LocalStorageAccessService, private lang: TranslateService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if (localStorage.getItem('user')) {
      // logged in so return true
      return true;
    }
    toastr.info(this.lang.instant('signInToNavigate'));
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
