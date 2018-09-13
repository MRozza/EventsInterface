import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../../../components/translation";

@Component({
  selector: 'app-account-settings-notifications',
  templateUrl: './account-settings-notifications.component.html'
})
export class AccountSettingsNotificationsComponent implements OnInit {

  constructor(title: Title,private translateService:TranslateService) {
    title.setTitle(this.translateService.translate('siteName')+' | '+this.translateService.translate('AccountSettingsNotifications'));

  }

  ngOnInit() {
  }

}
