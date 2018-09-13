//http://bootstrap-datepicker.readthedocs.io/en/latest/

import {DateOptions} from "./date-options";
import {EventEmitter} from "@angular/core";

declare let jQuery: any;

export class PickDate {
  private elem: any;
  private date: any;
  private options: DateOptions;
  public onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(_elem: any, _options: DateOptions) {
    this.options = _options;
    this.elem = jQuery(_elem);
    this.date = this.elem.datepicker(this.options);
    this.date.on('changeDate', (e) => {
      this.onChange.emit(e.date);
    });
  }

  public update(val: string): void {
    this.date.datepicker('update', val);
  }
}
