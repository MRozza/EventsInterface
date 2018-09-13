import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Search} from "../../../models/search";
import {CallService} from "../../../services/call.service";

@Component({
  selector: 'app-search-name',
  templateUrl: './search-name.component.html'
})
export class SearchNameComponent implements OnInit {
  @Input() public data:Search=<Search>{};
  @Output() dataChanged = new EventEmitter();
  constructor(private route: ActivatedRoute,private call:CallService ) {

  }

  ngOnInit() {
  }
  search(){
    this.dataChanged.emit();
  }
}
