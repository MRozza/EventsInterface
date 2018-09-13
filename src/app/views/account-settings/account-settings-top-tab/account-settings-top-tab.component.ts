import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-settings-top-tab',
  templateUrl: './account-settings-top-tab.component.html'
})
export class AccountSettingsTopTabComponent implements OnInit {
  @Input("activeTab") activeTab: number;

  constructor() { }

  ngOnInit() {
  }

}
