import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-evetns-top-bar',
  templateUrl: './my-evetns-top-bar.component.html'
})
export class MyEvetnsTopBarComponent implements OnInit {
  @Input("activeTab") activeTab: number;

  constructor() { }

  ngOnInit() {
  }

}
