import { CallNumber } from '@ionic-native/call-number/ngx';
import { Injectable } from '@angular/core';

@Injectable()
  export class CallMakerService  {

  
constructor(private callNumber: CallNumber) { }

onMakeACall(  telNumber:string)
{
   return this.callNumber.callNumber(telNumber, true)
  .then(res => {
    console.log('Launched dialer!', res);
  return res;
})
  .catch(err => console.log('Error launching dialer', err));
  }

  }