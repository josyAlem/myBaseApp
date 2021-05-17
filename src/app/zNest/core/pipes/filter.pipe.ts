import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestFilterPipe'
})
export class NestFilterPipe implements PipeTransform {

  transform(items: any[], callback:(item:any)=>boolean): any {
   if(!items || !callback){
     return items;
   }

   return items.filter(itm=>callback(itm));
  }

}
