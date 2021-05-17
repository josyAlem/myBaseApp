import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationService,NetworkService } from '@nest/core/services';
import { take } from 'rxjs/operators';



@Injectable()
export class MainAppService implements OnDestroy, OnInit {
  
  navList: nest.INavigationObject[];
 
  constructor(private netwSvc: NetworkService, 
    private navSvc:NavigationService
    ) {
   
      this.navList= this.navSvc.getNavigationList();
     
  
    }
  ngOnInit() {
  }


  getNavigationList() {
    return this.navList;
  }
  
  ngOnDestroy(): void {
    
  }

 
 
}
