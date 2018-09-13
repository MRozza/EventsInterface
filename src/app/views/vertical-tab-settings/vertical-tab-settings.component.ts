import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vertical-tab-settings',
  templateUrl: './vertical-tab-settings.component.html'
})
export class VerticalTabSettingsComponent implements OnInit {

  @Input("activeTab") activeTab: number;

  constructor() {
  }

  ngOnInit() {
  }

}
