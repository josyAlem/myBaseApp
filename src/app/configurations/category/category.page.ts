
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from "./category.service";
import {CategoryModel } from './category-model/category.model';
import { CategoryDto } from './category-model/category.dto';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import {  CommonHeaderViewComponent } from '@nest/core/templates';
import * as _ from 'underscore';
import { NetworkService } from '@nest/core';
import { MatTableDataSource } from '@angular/material/table';
import {AlertService} from '@nest/core/services';

@Component({
    templateUrl: './category.page.html',
})
export class CategoryPage extends CommonHeaderViewComponent  implements OnInit, OnDestroy {
    private _pageSubsc: Subscription;
    constructor(
        public _router: Router,
        public _location:Location,
        private netwSvc:NetworkService,
        private _categorysSvc: CategoryService,
        private route:ActivatedRoute,
        private _alertSvc: AlertService) {
            super(_router,_location);
            this.buttonActions = []; 
            this.menuActions = []; 
        }

    //#region Local Variables
    categorysModel: nest.IDataModel = CategoryModel;
    selectedRowData: CategoryDto;
    showrows: number = 15;
    dataTable: any = {};
    showSearchRow: boolean = false;

    //#endregion

    ngOnInit() {
        this.initVariables();
     
        this.onLoadPage();
    };

    ngOnDestroy() {
        if (this._pageSubsc)
            this._pageSubsc.unsubscribe;

    }
   
    initVariables() {
        this.buttonActions = [
          { label: 'New', icon: 'add', command: (mId:string,data:any) => this.onNew()}
        ];
    }

    onLoadPage(): void {
        this._pageSubsc = this._categorysSvc.categoryList$.subscribe(r => {
            this.initDataTable();
        }); 
                this._categorysSvc.readPaged();
    };

    initDataTable() {
        const dataList:CategoryDto[]=[];
        this._categorysSvc.categoryList$.forEach(c=>{
            c.forEach(cc=>dataList.push(cc));
        });
       
    
        this.dataTable={
        tableCaption:"Category List",//this.store.selectSnapshot(ConfigState.getLocalization("::Menu:Category")) +" List",
        rows:new MatTableDataSource<CategoryDto>(dataList),
        columns:this.categorysModel.columns,
        selectableRows: false,
        paginator: true,
        contextMenu: [
            {id:"Add category", label: "Add category", icon: "add", command: (mId:string,data:any) => this.onCtxMenuClicked(mId,data) },
            {id:"Add category2", label: "Add category2", icon: "add", disabled: true, command: (mId:string,data:any) =>this.onCtxMenuClicked(mId,data) },
            {id:"Add category3", label: "Add category3", icon: "add", command: (mId:string,data:any) => this.onCtxMenuClicked(mId,data) }
          ] 
    };

    }
    onCtxMenuClicked(mId:string,data:any){
console.log("title:"+mId + " msg:"+JSON.stringify(data));
    }

    onCategorySelected(category: any): void {
        this.selectedRowData = category;
    };
    onCategoryUnselected(category: any): void {
        this.selectedRowData = category;
    };
   
    onNew(): void {
        this._router.navigate(['editor', 0],{relativeTo:this.route});
    };
    onNavigateBack(): void {
        this._location.back();
      }
   
}


