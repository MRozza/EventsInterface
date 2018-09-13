import {HttpHeaders, HttpParams} from "@angular/common/http";

export interface CustomRequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface Register{
  fname:string;
  lname:string;
  email:string;
  country:Countries;
}


export interface  Countries{
  name:string;
  type:string;
}
