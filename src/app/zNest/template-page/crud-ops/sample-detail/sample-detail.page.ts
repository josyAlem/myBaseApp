import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonHeaderViewComponent, NetworkService } from '@nest/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudOpsService } from '../crud-ops.service';
import * as _ from 'underscore';
import { SampleDto,getSampleData } from '../sample-model/sample.dto';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './sample-detail.page.html',
})
export class SampleDetailPage extends CommonHeaderViewComponent implements OnInit {
  _currentRecordId: string;
  headerTitle: string;
  selectedData: SampleDto;
constructor(
  private netwSvc:NetworkService,
  public _route: ActivatedRoute,
    public _router: Router,
    public _location :Location,
    private _samplesSvc: CrudOpsService) {
    super(_router,_location);
    this.menuActions = [];

  }

  ngOnInit() {
    this.initVariables();
    this.initDetailData();
  }

  initVariables() {
    this._currentRecordId = "";
    this.headerTitle = "";
    this.buttonActions = [
      { label: 'Edit', icon: 'pencil-outline', command: (mId:string,data:any) =>  this.onEdit() },
      { label: 'Delete', icon: 'trash', command: (mId:string,data:any) => this.onDelete() },
      { label: 'Report', icon: 'document', command: (mId:string,data:any) => null },
    ];
    this.menuActions = [
      { label: 'Edit', icon: 'pencil-outline', command: (mId:string,data:any) =>  this.onEdit() },
      { label: 'Delete', icon: 'trash', command: (mId:string,data:any) => this.onDelete() }
    ];
  }

  initDetailData(): void {

    this._currentRecordId = this._route.snapshot.params['id'];
    if (this._currentRecordId != null && Number(this._currentRecordId) != 0) {
      this.netwSvc.isOffline.pipe(take(1)).subscribe(networkResult=>{
        if(networkResult==false)
           {
            this._samplesSvc.getById(this._currentRecordId)
            .subscribe(currentData => {
              if (currentData != null) {
                this.selectedData = currentData;
                this.headerTitle = this.selectedData.name;
              }
            },
              errs => console.log(errs));
           }
            else {
                let currentData=getSampleData().find(c=>c.id==this._currentRecordId);
                if (currentData != null) {
                  this.selectedData = currentData;
                  this.headerTitle = this.selectedData.name;
                }
                }
            });
    }
  }


  onEdit(): void {
    this._router.navigate(['template-page/crud-ops/editor', this._currentRecordId]);
  };

  onDelete(): void {
    this._samplesSvc.deleteExisting(this._currentRecordId).then(() => {
      this.onNavigateBack();
    });
  };
}
