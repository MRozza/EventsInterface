import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class LocalStorageAccessService {
  currentUser = new Subject();
  constructor() { }


  set setItem(value) {
    this.currentUser.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('user', value);
  }

  get getItem() {
    return localStorage.getItem('user');
  }
}
