import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from "../../../interfaces/select-option";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {

  @Input() data:SelectOption[]=[];
  public selectOptions:SelectOption[] = [];
  public  selected : SelectOption;
  @Output() selectOptionsChange:EventEmitter<SelectOption[]>=new EventEmitter<SelectOption[]>();
  public  isChecked : boolean = (this.data.length==0);
  constructor() { }

  PushToSelected(option :string )
  {

    var selected  =  this.data.filter(x => x.id == option)[0];
    this.selectOptions.push(selected);
    const index: number = this.data.indexOf(selected);
    if (index !== -1) {
      this.data.splice(index, 1);
    }

   var defaultoption : SelectOption= { id : -1 , text: 'أضف مدينة' , selected:true};
    this.selected = defaultoption;
    this.selectOptionsChange.emit(this.selectOptions);

    this.isChecked = (this.data.length==0);
  }

  removeFromSelected(option :string)
  {
    var selected  =  this.selectOptions.filter(x => x.id == option)[0];

    this.data.push(selected);
    const index: number = this.selectOptions.indexOf(selected);
    if (index !== -1) {
      this.selectOptions.splice(index, 1);
    }

    this.selectOptionsChange.emit(this.selectOptions);

    this.isChecked = (this.data.length==0);
  }

  SelectAllCities(value ){
   if(value == true)
   {
     for(var i=0;i<this.data.length;i++)
     this.selectOptions.push(this.data[i]);

     this.data.splice(0,this.data.length);
   }
   else {
     for(var i=0;i<this.selectOptions.length;i++)
       this.data.push(this.selectOptions[i]);

     this.selectOptions.splice(0,this.selectOptions.length);
   }
    this.selectOptionsChange.emit(this.selectOptions);

  }

  ngOnInit() {
  }

}
