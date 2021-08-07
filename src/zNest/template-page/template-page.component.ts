import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.html',
  styleUrls: ['./template-page.scss'],
})
export class TemplatePageComponent implements OnInit {
  tmplList:nest.INavigationObject[];

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  
  this.fillNavList();
  }
goTo(routePath:string)
{
this.router.navigateByUrl(routePath);

}
ionSplitPaneVisible(){
  console.log('menu opened')
}
  private fillNavList() {
    this.tmplList = [
      {
        id: "pickers",
        title: "Pickers",
        route: "template-page/pickers",
        icon: "",
        order: 1,
        isDefaultPath: true
      },
      {
        id: "call-sms",
        title: "Call & SMS",
        route: "template-page/call-sms",
        icon: "",
        order: 2,
        isDefaultPath: true
      },
      {
        id: "form-control",
        title: "Form Controls",
        route: "template-page/form-control",
        icon: "",
        order: 3,
        isDefaultPath: true
      },
      {
        id: "crud-ops",
        title: "Crud Operations",
        route: "template-page/crud-ops",
        icon: "",
        order: 4,
        isDefaultPath: true
      }];
    }
}
