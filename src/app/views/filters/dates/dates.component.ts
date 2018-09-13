import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateOptions} from "../../../controls/pick-date/date-options";
import {DateOutput} from "../../../interfaces/date-output";
import {DateOption} from "../../../interfaces/date-option";

declare const jQuery: any;


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html'
})
export class DatesComponent implements OnInit {

  @Input() datesList: DateOption[] = [];
  @Output() dateOptionChanged: EventEmitter<DateOutput> = new EventEmitter<DateOutput>();

  public StartDate: Date = null;
  public EndDate: Date = null;
  public dateOption: DateOptions = <DateOptions>{};

  constructor() {
  }

  ChangeSelection(dateoption: DateOption) {
    for (let entry of this.datesList) {
      entry.selected = entry.id == dateoption.id;
    }
  }

  ApplySearchByDates() {
    let selected: DateOption = null;
    for (let entry of this.datesList) {
      if (entry.selected) selected = entry;
    }
    this.dateOptionChanged.emit(<DateOutput>{
      StartDate: this.StartDate
      , EndDate: this.EndDate, dateOption: selected
    });
  }

  // UpdateDates(e, modelProp) {
  //   if (modelProp == 'EndDate')
  //     this.EndDate = e.target.value;
  //   else if (modelProp == 'StartDate')
  //     this.StartDate = e.target.value;
  // }

  ngOnInit() {
  }

  dateChanged(event: any): void {
    if (!jQuery('#check_8').is(':checked')) {
      jQuery('#check_8').trigger("click");
    }
  }

}
