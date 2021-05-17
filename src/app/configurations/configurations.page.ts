import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit {
configTypes:any[];
  constructor(private _router:Router,
    private route:ActivatedRoute) { 

    this.configTypes=[
      {
        name:'Category',
        icon:'cog',
        routePath:'category'
      },
      {
        name:'Unit',
        icon:'cog',
        routePath:'unit'
      },
      {
        name:'Item',
        icon:'cog',
        routePath:'item'
      },
      {
        name:'Expense Type',
        icon:'cog',
        routePath:'expense-type'
      }

    ]
  }

  ngOnInit() {
  }
  onGoTo(configPath:string): void {
    this._router.navigate([configPath],{relativeTo:this.route});
};


}
