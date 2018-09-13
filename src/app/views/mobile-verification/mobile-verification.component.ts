import { Component, OnInit } from '@angular/core';
import {CallService} from "../../services/call.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mobile-verfication',
  templateUrl: './mobile-verification.component.html'
})
export class MobileVerificationComponent implements OnInit {

  constructor(private call:CallService,private activatedRoute:ActivatedRoute) { }
verificationNumber:number;
  submitted:boolean=false;
  userId:string='';
  private data = {
    "userId":0,
    "verificationNumber":0,
  };
  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  onSubmit() {
    this.submitted = true;

    if(Number(this.userId))
      this.data['userId']=Number(this.userId);
    this.data['verificationNumber']=this.verificationNumber;
    // TODO: delete test, type the right url and use the data returned
      //this.call.post('',JSON.stringify(this.data),'json');
  }
}
