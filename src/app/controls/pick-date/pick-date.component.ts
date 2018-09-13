import {
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DateOptions} from "./date-options";
import {PickDate} from "./pick-date";
import {SessionService} from "../../services/session.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

declare let moment: any;
declare let jQuery: any;

const noop = () => {
};

export const PICK_DATE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PickDateComponent),
  multi: true
};

@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.component.html',
  providers: [PICK_DATE_CONTROL_VALUE_ACCESSOR]
})
export class PickDateComponent implements OnInit, OnChanges, ControlValueAccessor {

  private date: PickDate;
  @ViewChild('elem') elem: ElementRef;
  @Input() options: DateOptions;
  @Output() dateChanged: EventEmitter<any> = new EventEmitter<any>();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private session: SessionService) {
  }

  ngOnInit() {
    jQuery(this.elem.nativeElement).change(() => {
      this.onChangeCallback(jQuery(this.elem.nativeElement).val());
    });
  }

  ngOnChanges(ele: SimpleChanges) {
    if (ele.options && this.options) {
      this.options.language = 'ar';
      this.options.autoclose = true;
      this.options.format = 'yyyy-mm-dd';
      this.date = new PickDate(this.elem.nativeElement, this.options);
      this.date.onChange.subscribe((d: any) => {
        this.dateChanged.emit(d);
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (this.date) {
      if (obj) {
        this.date.update(obj);
      } else {
        this.date.update('');
      }
    }
  }
}
