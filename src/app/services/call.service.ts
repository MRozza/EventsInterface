import {Inject, Injectable, Injector, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import * as gvars from '../../globals';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CustomRequestOptions} from "../enums/requests";
import "rxjs/add/observable/of";
import {TranslateService} from "../components/translation";
import {Router} from "@angular/router";
declare const toastr: any;


@Injectable()
export class CallService {

  constructor(private http: HttpClient, private translate: TranslateService,private router:Router) {
  }

  private getHeaders(type: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', type);
    if (localStorage.getItem('eventsToken')) {
      headers = headers.set('Authorization', ' bearer ' + localStorage.getItem('eventsToken'));
    }
    return headers;
  }

  public get<T>(url: string, parms: any = null, bodyType: string = ''): Observable<T> {
    url = url.indexOf('#backend') >= 0 ? url.replace('#backend', gvars.backend) : gvars.backend + url;
    let type: string;
    switch (bodyType) {
      case 'json':
        type = 'application/json; charset=utf-8';
        break;
      default:
        type = 'application/x-www-form-urlencoded; charset=utf-8';
    }
    const options: CustomRequestOptions = <CustomRequestOptions>{};
    options.headers = this.getHeaders(type);
    let params: HttpParams = new HttpParams();
    if (parms == null) {
      parms = {};
    }

    Object.keys(parms).map((key) => {
      params = params.set(key, parms[key]);
    });
    options.params = params;
    return this.http.get<T>(url, options)
      .catch(this.handleAuthError);
  }

  public post<T>(url: string, body?: any, bodyType?: string): Observable<T> {
    bodyType = bodyType ? bodyType : 'json';
    body = body ? body : {};
    url = url.indexOf('#backend') >= 0 ? url.replace('#backend', gvars.backend) : gvars.backend + url;
    let type: string;
    switch (bodyType) {
      case 'json':
        type = 'application/json; charset=utf-8';
        break;
      default:
        type = 'application/x-www-form-urlencoded; charset=utf-8';
    }
    const options: CustomRequestOptions = <CustomRequestOptions>{};
    options.headers = this.getHeaders(type);
    return this.http.post<T>(url, body, options).catch(err => {
      return this.handleAuthError(err)
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      toastr.error('غير مصرح لك بالدخول على هذه الصفحة', null);
      //navigate /delete cookies or whatever
      //this.router.navigateByUrl('/login');
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return Observable.of(401);
    }
    else if (err.status === 400) {
      toastr.error(this.translate.translate(err.error), null);
      //navigate /delete cookies or whatever
      //this.router.navigateByUrl(`/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return Observable.of(400);
    }
    return Observable.throw(err);
  }

}
