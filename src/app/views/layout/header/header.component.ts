import {Component, OnInit} from '@angular/core';
import {LocalStorageAccessService} from "../../../services/local-storage-access.service";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

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
