import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from "../../../interfaces/select-option";

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html'
})
export class EventTypesComponent implements OnInit {
  @Input() data:SelectOption[];
  @Output() selectedTypeChanged:EventEmitter<SelectOption[]>=new EventEmitter<SelectOption[]>();

  constructor() { }

  ngOnInit() {
  }

  ToggleTypeSelect()
  {
    this.selectedTypeChanged.emit(this.data);
  }

}
