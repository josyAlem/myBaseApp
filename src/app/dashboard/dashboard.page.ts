import { Component, OnInit } from '@angular/core';
import {  Subject, Observable } from 'rxjs';
import{Store,Select} from '@ngxs/store';
import {ZooStateModel, ZooDuty, ZooState}  from '@app_main/shared';
import { } from '@nest/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
content$:Subject<string>;
content:string;
zoo$: Observable<ZooStateModel>;
constructor(private store:Store) {

    this.content$=new Subject<string>();
    this.content$.subscribe((v)=>{
      this.content=v;
    });
    this.content$.next("");
   }
  ngOnInit() {
  this.zoo$=this.store.select(ZooState);
  this.store.dispatch(new ZooDuty.FeedAnimals({name:"Panda",hayAmount:10}));
    this.zoo$.subscribe((r)=>{
      const hasEaten = this.store.selectSnapshot(ZooState.hasEaten); // infers type ZooStateModel
     if(hasEaten)
      this.content$.next( hasEaten.name+' has Eaten');

  });
}

}
