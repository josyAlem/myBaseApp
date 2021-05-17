import { Component, OnInit } from '@angular/core';
import { AlertService, CallMakerService } from '@nest/core';
import { Location, JsonPipe } from '@angular/common';

@Component({
  templateUrl: './call-sms.page.html',
  styleUrls: ['./call-sms.page.scss'],
})
export class CallSmsPage implements OnInit {

  enteredNumber:string=null;
    constructor(
      private callSvc:CallMakerService,
    private _location:Location,
    private alertSvc:AlertService
      ) { }
 

    ngOnInit() {
  
  
    }
    onNavigateBack(): void {
      this._location.back();
    }
     onMakeCall(){
    this.callSvc.onMakeACall(this.enteredNumber).then(()=>{
    },(err)=>{
      this.alertSvc .showError({msg:JSON.stringify(err)}) ;

    });
  
  }
}
