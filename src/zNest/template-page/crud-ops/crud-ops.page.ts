
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudOpsService } from "./crud-ops.service";
import {SampleModel } from './sample-model/sample.model';
import { SampleDto,getSampleData } from './sample-model/sample.dto';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import {  CommonHeaderViewComponent } from '@nest/core/templates';
import * as _ from 'underscore';
import { take } from 'rxjs/operators';
import { NetworkService } from '@nest/core';
import { MatTableDataSource } from '@angular/material/table';
import {AlertService} from '@nest/core/services';

@Component({
    templateUrl: './crud-ops.page.html',
})
export class CrudOpsPage extends CommonHeaderViewComponent  implements OnInit, OnDestroy {
    private _pageSubsc: Subscription;
    constructor(
        public _router: Router,
        public _location:Location,
        private netwSvc:NetworkService,
        private _samplesSvc: CrudOpsService,
        private route:ActivatedRoute,
        private _alertSvc: AlertService) {
            super(_router,_location);
            this.buttonActions = []; 
            this.menuActions = []; 
        }

    //#region Local Variables
    samplesModel: nest.IDataModel = SampleModel;
    selectedRowData: SampleDto;
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
        this._pageSubsc = this._samplesSvc.sampleList$.subscribe(r => {
            this.initDataTable();
        }); 

        this.netwSvc.isOffline.pipe(take(1)).subscribe(result=>{
            if(result==false)
                this._samplesSvc.readPaged();
                else {
                    let sampleData=getSampleData();
                    this._samplesSvc.sampleList$.next(sampleData);
                    }
                });
       
              
    };

    initDataTable() {
        const dataList:SampleDto[]=[];
        this._samplesSvc.sampleList$.forEach(c=>{
            c.forEach(cc=>dataList.push(cc));
        });
       
    
        this.dataTable={
        tableCaption:"Sample List",//this.store.selectSnapshot(ConfigState.getLocalization("::Menu:Sample")) +" List",
        rows:new MatTableDataSource<SampleDto>(dataList),
        columns:this.samplesModel.columns,
        selectableRows: false,
        paginator: true,
        contextMenu: [
            {id:"Add sample", label: "Add sample", icon: "add", command: (mId:string,data:any) => this.onCtxMenuClicked(mId,data) },
            {id:"Add sample2", label: "Add sample2", icon: "add", disabled: true, command: (mId:string,data:any) =>this.onCtxMenuClicked(mId,data) },
            {id:"Add sample3", label: "Add sample3", icon: "add", command: (mId:string,data:any) => this.onCtxMenuClicked(mId,data) }
          ] 
    };

    }
    onCtxMenuClicked(mId:string,data:any){
console.log("title:"+mId + " msg:"+JSON.stringify(data));
    }

    onSampleSelected(sample: any): void {
        this.selectedRowData = sample;
    };
    onSampleUnselected(sample: any): void {
        this.selectedRowData = sample;
    };
    onFieldClicked(event:any){
        console.log(JSON.stringify(event));
        this._router.navigate(['detail',event.rowData["id"]],{relativeTo:this.route});
    }
    onNew(): void {
        this._router.navigate(['editor', 0],{relativeTo:this.route});
    };
    onNavigateBack(): void {
        this._location.back();
      }
   
}


