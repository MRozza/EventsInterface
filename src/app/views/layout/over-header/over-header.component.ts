import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {LocalStorageAccessService} from "../../../services/local-storage-access.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-over-header',
  templateUrl: './over-header.component.html'
})
export class OverHeaderComponent implements OnInit {

  constructor(private accessStorage: LocalStorageAccessService, private authService: AuthService, private router: Router) {
  }

  public currentUser: User;

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
  }

}
